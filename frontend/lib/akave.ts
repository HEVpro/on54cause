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

export async function uploadFile(bucketName: string, jsonData: object) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/buckets/${bucketName}/data`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
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
