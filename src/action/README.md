# Backend Actions

This folder contains server actions for backend functionality.

## Usage

Place your server actions here. Server actions are functions that run on the server and can be called from client components.

### Example:

```typescript
'use server'

import { prisma } from '@/lib/db'

export async function getKurtis(category?: string) {
  const kurtis = await prisma.kurti.findMany({
    where: {
      isDeleted: false,
      ...(category && { category }),
    },
  })
  return kurtis
}
```

Then import and use in your components:

```typescript
import { getKurtis } from '@/src/action/kurti-actions'

// In your component
const kurtis = await getKurtis('KTD')
```

