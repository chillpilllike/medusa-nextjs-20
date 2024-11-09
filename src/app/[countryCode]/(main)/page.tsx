import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsList, getProductsList } from "@lib/data/collections" // Ensure these are imported
import { getRegion } from "@lib/data/regions"
import { cache } from "react" // Import cache if using React's built-in cache

// Metadata for the page
export const metadata: Metadata = {
  title: "Transform Your Home and Garden Today",
  description:
    "Discover a wide range of essentials to elevate your living spaces, inside and out.",
}

// Define cached function for fetching collections with products
const getCachedCollectionsWithProducts = cache(
  async (countryCode: string): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 3)

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id] },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        const collection = collections.find(
          (collection) => collection.id === queryParams?.collection_id?.[0]
        )

        if (collection) {
          collection.products = response.products as Product[]
        }
      })
    )

    return collections as ProductCollectionWithPreviews[]
  }
)

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCachedCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
