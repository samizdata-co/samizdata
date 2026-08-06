import { rssFeed } from '../lib/blog';

export function GET(context) {
	return rssFeed(context, 'en');
}
