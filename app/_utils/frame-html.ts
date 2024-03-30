const frameImages = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
]

export const homeHtml = (host: string, page: number=0) => `
    <!DOCTYPE>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${ host }/${ frameImages[page] }" />
        <meta property="fc:frame:image:aspect_ratio" content="1:1" />
        <meta property="fc:frame:post_url" content="${ host }" />
        ${
            page === 0
            ? '<meta property="fc:frame:button:1" content="Next →" />'
            : ''
        }
        ${
            page !== 0
            ? '<meta property="fc:frame:button:1" content="← Prev" />'
            : ''

        }
        ${
            page !== frameImages.length - 1 && page !== 0
            ? '<meta property="fc:frame:button:2" content="Next →" />'
            : ''

        }
        ${
            page !== 0
            ? `<meta property="fc:frame:state" content="${ page }" />`
            : ''
        }
      </head>

      <body>
        <figure>
            Introduction of fetch-from-fc-hub
        </figure>
      </body>
    </html>
  `
