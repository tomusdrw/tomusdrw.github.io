import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteSettings } from '../data/settings';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: siteSettings.title,
    description: siteSettings.description,
    site: context.site!,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/${post.id}`,
      description: post.body?.slice(0, 200),
    })),
  });
}
