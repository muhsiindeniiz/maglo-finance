import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.API_BASE_URL || 'https://case.nodelabs.dev/api'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ proxy: string[] }> }
) {
  const resolvedParams = await params
  return handleRequest(request, resolvedParams.proxy, 'GET')
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ proxy: string[] }> }
) {
  const resolvedParams = await params
  return handleRequest(request, resolvedParams.proxy, 'POST')
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ proxy: string[] }> }
) {
  const resolvedParams = await params
  return handleRequest(request, resolvedParams.proxy, 'PUT')
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ proxy: string[] }> }
) {
  const resolvedParams = await params
  return handleRequest(request, resolvedParams.proxy, 'DELETE')
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ proxy: string[] }> }
) {
  const resolvedParams = await params
  return handleRequest(request, resolvedParams.proxy, 'PATCH')
}

async function handleRequest(request: NextRequest, proxyPath: string[], method: string) {
  try {
    const path = proxyPath.join('/')
    const searchParams = request.nextUrl.searchParams.toString()
    const url = `${API_BASE_URL}/${path}${searchParams ? `?${searchParams}` : ''}`

    console.log(`[Proxy] ${method} ${url}`)

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    const authHeader = request.headers.get('authorization')
    if (authHeader) {
      headers['Authorization'] = authHeader
    }

    const cookieHeader = request.headers.get('cookie')
    if (cookieHeader) {
      headers['Cookie'] = cookieHeader
    }

    const options: RequestInit = {
      method,
      headers,
      credentials: 'include',
    }

    if (method !== 'GET' && method !== 'HEAD') {
      try {
        const body = await request.text()
        if (body) {
          options.body = body
          console.log(`[Proxy] Request body:`, body)
        }
      } catch (error) {
        console.error('[Proxy] Error reading request body:', error)
      }
    }

    const response = await fetch(url, options)
    console.log(`[Proxy] Response status:`, response.status)

    const data = await response.text()
    let jsonData
    try {
      jsonData = data ? JSON.parse(data) : null
    } catch {
      jsonData = data
    }

    const responseHeaders = new Headers()
    responseHeaders.set('Content-Type', 'application/json')

    responseHeaders.set('Access-Control-Allow-Origin', '*')
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    responseHeaders.set('Access-Control-Allow-Credentials', 'true')

    const setCookieHeaders = response.headers.get('set-cookie')
    if (setCookieHeaders) {
      responseHeaders.set('Set-Cookie', setCookieHeaders)
    }

    return NextResponse.json(jsonData, {
      status: response.status,
      headers: responseHeaders,
    })
  } catch (error) {
    console.error('[Proxy] Error:', error)
    return NextResponse.json(
      {
        message: 'Internal server error',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    }
  )
}
