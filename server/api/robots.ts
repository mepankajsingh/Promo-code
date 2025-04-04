import { defineEventHandler, readBody, createError } from 'h3'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Only allow POST method
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      message: 'Method not allowed'
    })
  }

  try {
    // Check admin authorization
    const client = await serverSupabaseClient(event)
    const { data: { user } } = await client.auth.getUser()

    if (!user || user.id !== 'd38b6b3e-189c-47ce-b6a6-48187d160ebd') {
      throw createError({
        statusCode: 403,
        message: 'Unauthorized'
      })
    }

    const body = await readBody(event)
    const { content } = body

    if (!content) {
      throw createError({
        statusCode: 400,
        message: 'Content is required'
      })
    }

    // Validate robots.txt content
    const lines = content.split('\n')
    const hasUserAgent = lines.some(line => line.trim().startsWith('User-agent:'))
    const hasDisallow = lines.some(line => line.trim().startsWith('Disallow:'))

    if (!hasUserAgent || !hasDisallow) {
      throw createError({
        statusCode: 400,
        message: 'Invalid robots.txt content. Must contain User-agent and Disallow directives.'
      })
    }

    // Write to robots.txt
    await writeFile(join(process.cwd(), 'public', 'robots.txt'), content)

    return { success: true }
  } catch (error) {
    console.error('Error updating robots.txt:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to update robots.txt'
    })
  }
})
