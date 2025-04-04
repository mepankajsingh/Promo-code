import { defineEventHandler, createError } from 'h3'
import Parser from 'rss-parser'

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, application/atom+xml, text/xml;q=0.9, */*;q=0.8'
  },
  customFields: {
    item: [
      ['content:encoded', 'contentEncoded'],
      ['dc:creator', 'creator']
    ]
  },
  timeout: 10000
})

const FEED_URL = 'https://www.blogger.com/feeds/5245696872621940063/posts/default'

export default defineEventHandler(async (event) => {
  try {
    // Add CORS headers
    event.node.res.setHeader('Access-Control-Allow-Origin', '*')
    event.node.res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    event.node.res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (event.node.req.method === 'OPTIONS') {
      event.node.res.statusCode = 204
      return null
    }

    const feed = await parser.parseURL(FEED_URL)
    
    if (!feed?.items?.length) {
      throw new Error('No feed items found')
    }

    return {
      items: feed.items.slice(0, 10).map(item => ({
        title: item.title,
        link: item.link,
        content: item.contentSnippet?.slice(0, 200) + (item.contentSnippet?.length > 200 ? '...' : ''),
        date: item.pubDate || item.isoDate,
        author: item.creator || 'Google Workspace Team'
      }))
    }
  } catch (error) {
    console.error('Error fetching feed:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch Google Workspace updates. Please try again later.'
    })
  }
})
