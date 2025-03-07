import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

const DISABLE_AUTH = true;

function validateGraphApiKey(request: NextRequest): boolean {
  if (DISABLE_AUTH) return true;

  const expectedApiKey = process.env.GRAPHQL_API_KEY;
  const apiKeyFromHeaders = request.headers.get('Authorization');
  const apiKeyFromQuery = new URL(request.url).searchParams.get('apiKey');

  return (
    apiKeyFromHeaders === `Bearer ${expectedApiKey}` ||
    apiKeyFromQuery === expectedApiKey
  );
}

export async function createContext({ req }: { req: NextRequest }) {
  try {
    if (DISABLE_AUTH) {
      return { user: { id: 'dummy', name: 'Dummy User', role: 'ADMIN' } };
    }

    if (!validateGraphApiKey(req)) {
      throw new Error('Unauthorized: No Access');
    }

    const session = await getServerSession(authOptions);

    if (!session || typeof session === 'undefined') return {};
    const { user } = session;
    return { user };
  } catch (error) {
    console.error('Error in createContext:', error);
    throw error;
  }
}
