import { NextRequest } from 'next/server'
import { htmlResponse } from '@/app/_utils/response'
import { homeHtml } from '@/app/_utils/frame-html'
import { getValidateMessage } from '@/app/_utils/farcasterAPI'
import { getFrameHost } from '@/app/_utils/host'

export const dynamic = 'force-dynamic' // static by default, unless reading the request

export async function GET(request: NextRequest) {
    const host = getFrameHost(request)
    return htmlResponse(homeHtml(host))
}

export async function POST(request: NextRequest) {
    const host = getFrameHost(request)
    const body = await new Response(request.body).json();
    console.log('home body: ', body)
    const data = await getValidateMessage(body.trustedData.messageBytes)
    console.log('home data: ', data)
    const frameActionBody = data.message.data.frameActionBody
    console.log('home frameActionBody: ', frameActionBody)
    const buttonIndex = frameActionBody.buttonIndex

    const state = frameActionBody.state
    let nextPage = 0
    if(state) {
        const currentPage = Buffer.from(state, 'base64').toString('binary')
        nextPage = buttonIndex === 1 ? Number(currentPage ) - 1 : Number(currentPage ) + 1
    } else {
        nextPage = 1
    }

    return htmlResponse(homeHtml(host, nextPage))
}
