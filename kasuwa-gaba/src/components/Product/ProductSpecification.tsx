import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { ProductType } from '../../context/ProductProvider'

type PropsType = {
  product: ProductType
}

export default function ProductInfos( {product}: ProductType) {
  return (
    <>
      <div className="flex h-screen w-full justify-center pt-0 px-4">
        <div className="w-full max-w-[80vw]">
          <TabGroup>
            <TabList className="flex gap-4">
                <Tab
                  key="Specifications"
                  // className="rounded-full py-1 px-3 text-sm/6 font-semibold text-slate-900 focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                  className="text-gray-800 font-semibold text-md bg-gray-100 py-3 px-8 border-b-2 border-gray-800 cursor-pointer transition-all focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  Specifications
                </Tab>
                <Tab
                  key="Reviews"
                  className="py-1 px-3 text-md font-semibold text-slate-800 focus:outline-2 data-[selected]:bg-white/10 data-[hover]:bg-slate-900/5 data-[selected]:data-[hover]:bg-slate-900/10 data-[focus]:outline-1 data-[focus]:outline-black"
                >
                  Reviews
                </Tab>

            </TabList>
            <TabPanels className="mt-3">
                <TabPanel key="Specifications" className="space-y-3 list-disc mt-6 pl-4 text-sm text-gray-500">
                  <ul>
                    {Object.entries(product.specifications).map(([key, value]) => (
                    <li key={key} className="py-1">
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}

                  </ul>
                </TabPanel>

                {/* Reviews Panel */}
              <TabPanel key="Reviews" className="rounded-xl bg-white/5 p-3">
                <ul>
                  {product.reviews.length > 0 ? (
                    product.reviews.map((review) => (
                      <li
                        key={review.id}
                        className="relative rounded-md p-3 text-sm/6 transition hover:bg-white/5"
                      >
                        <a href="#" className="font-semibold text-white">
                          <span className="absolute inset-0" />
                          {review.title}
                        </a>
                        <ul className="flex gap-2 text-white/50" aria-hidden="true">
                          <li>{review.date}</li>
                          <li aria-hidden="true">&middot;</li>
                          <li>{review.commentCount} comments</li>
                        </ul>
                      </li>
                    ))
                  ) : (
                    <p className="text-black/50">No reviews yet.</p>
                  )}
                </ul>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    
    </>
    
  )
}


