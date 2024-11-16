/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import * as jose from 'jose'

export async function POST(req: Request): Promise<Response> {
    try {
        // Obtener el token de autorización
        const authorization = req.headers.get('authorization') || ''
        const idToken = authorization.split(' ')[1] || ''
        const body = await req.json() // Parsear el cuerpo de la solicitud
        const app_pub_key = body.appPubKey

        // Configurar el JWKS para la verificación
        const jwks = jose.createRemoteJWKSet(
            new URL('https://api.openlogin.com/jwks')
        )
        const jwtDecoded = await jose.jwtVerify(idToken, jwks, {
            algorithms: ['ES256'],
        })

        // Verificar las claves públicas
        const wallets = (jwtDecoded.payload as any).wallets || []
        const matchingWallet = wallets.find(
            (x: { type: string }) => x.type === 'web3auth_app_key'
        )

        if (
            matchingWallet &&
            matchingWallet.public_key.toLowerCase() ===
                app_pub_key.toLowerCase()
        ) {
            // Claves coinciden
            return new Response(
                JSON.stringify({ name: 'Validation Success' }),
                { status: 200 }
            )
        } else {
            // Claves no coinciden
            return new Response(JSON.stringify({ name: 'Failed' }), {
                status: 400,
            })
        }
    } catch (error) {
        // Manejo de errores
        return new Response(
            //@ts-ignore
            JSON.stringify({ error: error.message || 'Internal Server Error' }),
            { status: 500 }
        )
    }
}
