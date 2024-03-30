interface ITrustedData {
    valid: boolean,
    message: {
        data: {
            type: string,
            fid: number,
            timestamp: number,
            network: string,
            frameActionBody: IFrameActionBody
        },
        hash: string,
        hashScheme: string,
        signature: string,
        signatureScheme: string,
        signer:string
    }
}

interface IFrameActionBody {
    url: string,
    buttonIndex: number,
    inputText: string,
    state?: string,
    transactionId?: string,
    castId: {
        fid: number,
        hash: string
    }
    address?: string
}

const domain = process.env.HUB_DOMAIN

const apis = {
    validateMessage: () => `${ domain }/validateMessage`,
}

export const getValidateMessage = async (messageBytes: string) => {
    const binaryData =  new Uint8Array(
        messageBytes.match(/.{1,2}/g)!.map(
            (byte) => parseInt(byte, 16)
        )
    )

    const response = await fetch(
        apis.validateMessage(),
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/octet-stream' },
            body: binaryData
        }
    )

    return await response.json() as ITrustedData
}

export const getFrameAciontBody = async (messageBytes: string) => {
    const response = await getValidateMessage(messageBytes)
    const frameActionBody = response.message.data.frameActionBody
    const data = response.message.data
    return { data, frameActionBody }
}
