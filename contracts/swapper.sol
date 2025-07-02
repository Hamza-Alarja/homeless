// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPancakeRouter {
    function swapExactETHForTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable returns (uint[] memory amounts);

    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);

    function swapExactTokensForETH(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);

    function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);

    function WETH() external pure returns (address);
}

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract HomlessSwap {
    address public owner;
    address public router;
    uint public commissionRate; // Commission rate in basis points (e.g., 100 = 1%)

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor(address _router, uint _commissionRate) {
        owner = msg.sender;
        router = _router;
        commissionRate = _commissionRate;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function setCommissionRate(uint _commissionRate) external onlyOwner {
        commissionRate = _commissionRate;
    }

    function getDeadline() public view returns (uint) {
        return block.timestamp + 300; // 300 seconds = 5 minutes
    }

    function calculateAmountOut(address[] memory path, uint amountIn) public view returns (uint[] memory) {
        return IPancakeRouter(router).getAmountsOut(amountIn, path);
    }

    function swapETHForTokens(address token, uint slippageTolerance) external payable {
        uint commission = (msg.value * commissionRate) / 10000;
        uint amountAfterCommission = msg.value - commission;

        address[] memory path = new address[](2);
        path[0] = IPancakeRouter(router).WETH();
        path[1] = token;

        uint[] memory amountsOut = IPancakeRouter(router).getAmountsOut(amountAfterCommission, path);
        uint amountOutMin = (amountsOut[1] * (10000 - slippageTolerance)) / 10000;

        uint deadline = getDeadline();

        IPancakeRouter(router).swapExactETHForTokens{value: amountAfterCommission}(amountOutMin, path, msg.sender, deadline);

        payable(owner).transfer(commission);
    }

    function swapTokensForTokens(address tokenIn, address tokenOut, uint amountIn, uint slippageTolerance) external {
        uint commission = (amountIn * commissionRate) / 10000;
        uint amountAfterCommission = amountIn - commission;

        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenIn).approve(router, amountAfterCommission);

        address[] memory path = new address[](2);
        path[0] = tokenIn;
        path[1] = tokenOut;

        uint[] memory amountsOut = IPancakeRouter(router).getAmountsOut(amountAfterCommission, path);
        uint amountOutMin = (amountsOut[1] * (10000 - slippageTolerance)) / 10000;

        uint deadline = getDeadline();

        IPancakeRouter(router).swapExactTokensForTokens(amountAfterCommission, amountOutMin, path, msg.sender, deadline);

        IERC20(tokenIn).transfer(owner, commission);
    }

    function swapTokensForETH(address tokenIn, uint amountIn, uint slippageTolerance) external {
        uint commission = (amountIn * commissionRate) / 10000;
        uint amountAfterCommission = amountIn - commission;

        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenIn).approve(router, amountAfterCommission);

        address[] memory path = new address[](2);
        path[0] = tokenIn;
        path[1] = IPancakeRouter(router).WETH();

        uint[] memory amountsOut = IPancakeRouter(router).getAmountsOut(amountAfterCommission, path);
        uint amountOutMin = (amountsOut[1] * (10000 - slippageTolerance)) / 10000;

        uint deadline = getDeadline();

        IPancakeRouter(router).swapExactTokensForETH(amountAfterCommission, amountOutMin, path, msg.sender, deadline);

        IERC20(tokenIn).transfer(owner, commission);
    }

    function withdrawETH() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function withdrawTokens(address token) external onlyOwner {
        uint balance = IERC20(token).balanceOf(address(this));
        IERC20(token).transfer(owner, balance);
    }

    receive() external payable {}
}
