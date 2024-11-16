import fs from 'fs'
import FormData from 'form-data'

const API_BASE_URL = 'http://localhost:8000'

async function apiRequest(method: any, endpoint: any, data = null) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : null,
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const responseData = await response.json()
        console.log(responseData)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message)
        } else {
            console.error('An unknown error occurred')
        }
    }
}

export async function uploadFile(bucketName: string, filePath: string) {
    const form = new FormData()
    form.append('file', fs.createReadStream(filePath))

    try {
        const response = await fetch(
            `${API_BASE_URL}/buckets/${bucketName}/files`,
            {
                method: 'POST',
                headers: form.getHeaders(),
                body: form as unknown as string,
            }
        )

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const responseData = await response.json()
        console.log(responseData)
    } catch (error) {
        console.error(
            error instanceof Error ? error.message : 'An unknown error occurred'
        )
    }
}

// uploadFile('myBucket', './path/to/file.txt')
