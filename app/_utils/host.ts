import { NextRequest } from 'next/server'

export const getFrameHost = (request: NextRequest) => {
    return !process.env.RUNTIME_ENV || process.env.RUNTIME_ENV !== 'dev' ? request.nextUrl.origin : process.env.FORWARD_HOST ?? 'ERROR_HOST'
}
