import React from 'react';
import Iframe from 'react-iframe';
import Script from 'next/script';
export async function getStaticProps() {
    try {
      const response = await fetch('https://www.websea.com/en/');
      const html = await response.text();
  
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const targetSection = doc.querySelector('.tablePart');
      console.log("inside fetch");
      console.log(targetSection);
      return {
        props: {
          externalContent: targetSection?.innerHTML ?? 'TEST TEST', // Handle potential null value
        },
      };
    } catch (error) {
      console.error('Error fetching external content:', error);
      return {
        props: {
          externalContent: '<div>TEST</div>', // Fallback content in case of error
        },
      };
    }
  }


  const Trading: React.FC<{ externalContent: string }> = ({ externalContent }) => {
  return (
    <div>
       
      {/* Your other content */}
     {/*  <section dangerouslySetInnerHTML={{ __html: externalContent }} /> */}
     <Iframe url="https://coinbrain.com/trending-coins/" width="100%" height="600"  />
     
   

<Script strategy="afterInteractive">
  {`
    window.addEventListener('load', function () {
      var iframe = document.querySelector('iframe');
      var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      var section = iframeDocument.querySelector('.css-1qj0wac emf55gs0');

      if (section) {
        iframe.height = section.scrollHeight + 'px';
      }
    });
  `}
</Script>



    </div>
  );
};

export default Trading;