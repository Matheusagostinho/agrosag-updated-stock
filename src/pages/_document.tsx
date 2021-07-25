
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head>

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <meta name="application-name" content="AgroSag" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#178102"
          />
          <meta name="apple-mobile-web-app-title" content="AgroSag" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />

          <meta
            name="description"
            content="Atualize agora mesmo o seu estoque!"
          />
          <meta name="keywords" content="Keywords" />
          <meta name="theme-color" content="#178102" />

          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="favicon.png" type="image/png" />
          <link rel="manifest" href="/manifest.json" />
          <title>AgroSag</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
