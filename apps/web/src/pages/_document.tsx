/* eslint-disable jsx-a11y/iframe-has-title */
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      // eslint-disable-next-line no-param-reassign
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html translate="no">
        <Head>
          {process.env.NEXT_PUBLIC_NODE_PRODUCTION && (
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_NODE_PRODUCTION} />
          )}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;600&amp;display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/logo.png" />
          <link rel="manifest" href="/manifest.json" />
          <style>{`
            /* HOMELESSWAP - BASİT DARK & GOLD THEME */
            
            html, body, #__next, [data-theme="dark"], [data-theme="light"] {
              background: #000000 !important;
              color: #ffffff !important;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
              min-height: 100vh !important;
            }
            
            /* BAŞLIKLAR */
            h1, .title, [class*="hero"] h1 {
              color: #FFD700 !important;
              font-size: clamp(2rem, 5vw, 3rem) !important;
              font-weight: 700 !important;
              text-align: center !important;
              font-family: 'Poppins', 'Inter', sans-serif !important;
            }
            
            h2, h3, h4, h5, h6 {
              color: #FFD700 !important;
              font-weight: 600 !important;
            }
            
            /* BUTONLAR */
            button, [role="button"], input[type="submit"], input[type="button"],
            .btn, [class*="button"], [class*="Button"], a[class*="button"] {
              background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%) !important;
              color: #000000 !important;
              border: 1px solid #FFD700 !important;
              border-radius: 8px !important;
              padding: 12px 24px !important;
              font-weight: 600 !important;
              transition: all 0.3s ease !important;
            }
            
            button:hover, [class*="button"]:hover {
              background: linear-gradient(135deg, #FFED4E 0%, #FFD700 100%) !important;
              transform: translateY(-1px) !important;
            }
            
            /* METİNLER */
            p, span, div:not([class*="button"]):not(button), label {
              color: rgba(255, 255, 255, 0.9) !important;
              font-family: 'Inter', sans-serif !important;
            }
            
            /* LİNKLER */
            a:not([class*="button"]) {
              color: #FFD700 !important;
              text-decoration: none !important;
            }
            
            a:not([class*="button"]):hover {
              color: #FFED4E !important;
            }
            
            /* KARTLAR */
            .card, [class*="card"], section, article {
              background: rgba(20, 20, 20, 0.8) !important;
              border: 1px solid rgba(255, 215, 0, 0.2) !important;
              border-radius: 12px !important;
              padding: 20px !important;
            }
            
            /* TABLOLAR */
            table, th, td {
              background: rgba(10, 10, 10, 0.9) !important;
              color: #ffffff !important;
              border: 1px solid rgba(255, 215, 0, 0.1) !important;
            }
            
            th {
              color: #FFD700 !important;
              font-weight: 600 !important;
            }
            
            /* FORM ELEMENTLERİ */
            input, textarea, select {
              background: rgba(30, 30, 30, 0.9) !important;
              color: #ffffff !important;
              border: 1px solid rgba(255, 215, 0, 0.3) !important;
              border-radius: 6px !important;
              padding: 10px !important;
            }
            
            /* NAVİGASYON */
            nav, header, [class*="nav"] {
              background: rgba(0, 0, 0, 0.95) !important;
              border-bottom: 1px solid rgba(255, 215, 0, 0.2) !important;
            }
            
            nav a, header a {
              color: #FFD700 !important;
            }
            
            /* İKONLAR */
            svg, i, [class*="icon"] {
              color: #FFD700 !important;
              fill: #FFD700 !important;
            }
            
            /* PANCAKESWAP THEME VARIABLES */
            [data-theme] {
              --colors-background: #000000 !important;
              --colors-backgroundAlt: #1a1a1a !important;
              --colors-text: #ffffff !important;
              --colors-primary: #FFD700 !important;
              --colors-secondary: #b8860b !important;
              --colors-cardBorder: rgba(255, 215, 0, 0.2) !important;
            }
            
            /* MOBİL UYUM */
            @media (max-width: 768px) {
              h1 {
                font-size: clamp(1.5rem, 6vw, 2.5rem) !important;
              }
              
              button, .btn {
                padding: 10px 20px !important;
                font-size: 0.9rem !important;
              }
              
              .card, section {
                padding: 15px !important;
              }
            }
          `}</style>
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTAG}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
          <div id="portal-root" />
        </body>
      </Html>
    )
  }
}

export default MyDocument
