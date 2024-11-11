import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import { IconBadge, Text, clx } from "@medusajs/ui"
import { AtSymbol } from "@medusajs/icons"
import Script from "next/script"


import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <>
      {/* TrustBox External Script */}
      <Script
        type="text/javascript"
        src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        async
      />

      {/* TrustBox Widget - Micro Review Count */}
      <div
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id="5419b6a8b0d04a076446a9ad"
        data-businessunit-id="63abde420cd64197d7e1c9fa"
        data-style-height="24px"
        data-style-width="100%"
        data-min-review-count="0"
        data-style-alignment="center"
        style={{ textAlign: 'center', margin: '20px 0' }}
      >
        <a href="https://www.trustpilot.com/review/secretgreen.com.au" target="_blank" rel="noopener">Trustpilot</a>
      </div>

      {/* Reamaze External Script */}
      <Script
        type="text/javascript"
        async
        src="https://cdn.reamaze.com/assets/reamaze-loader.js"
      />

      {/* Reamaze Widget Configuration */}
      <Script
        id="reamaze-config"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            var _support = _support || { 'ui': {}, 'user': {} };
            _support['account'] = 'secretgreen2';
            _support['ui']['contactMode'] = 'default';
            _support['ui']['enableKb'] = 'true';
            _support['ui']['styles'] = {
              widgetColor: 'rgba(16, 162, 197, 1)',
              gradient: true,
            };
            _support['ui']['shoutboxFacesMode'] = 'default';
            _support['ui']['shoutboxHeaderLogo'] = true;
            _support['ui']['widget'] = {
              displayOn: 'all',
              fontSize: 'default',
              allowBotProcessing: true,
              slug: 'secretgreen-chat-slash-contact-form-shoutbox',
              label: {
                text: 'Let us know if you have any questions! 😊',
                mode: "notification",
                delay: 3,
                duration: 30,
                primary: 'I have a question',
                secondary: 'No, thanks',
                sound: true,
              },
              position: 'bottom-right',
              mobilePosition: 'bottom-right'
            };
            _support['apps'] = {
              faq: { "enabled": true },
              recentConversations: {},
              orders: {},
              shopper: {}
            };
          `,
        }}
      />
      
      <footer className="border-t border-ui-border-base w-full">
        <div className="content-container flex flex-col w-full">
          <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
            <div>
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
              >
                About SecretGreen
              </LocalizedClientLink>
              <p className="mt-2 text-ui-fg-subtle text-sm">
                Welcome to our store, your go-to destination for high-quality, unique products curated with care. We pride ourselves on delivering exceptional customer service, fast shipping, and a seamless shopping experience.
              </p>
              <p className="mt-2 text-ui-fg-subtle text-sm">
                <IconBadge>
      <AtSymbol />
    </IconBadge> support@SecretGreen.com.au
              </p>
            </div>
            <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
              {product_categories && product_categories.length > 0 && (
                <div className="flex flex-col gap-y-2">
                  <span className="txt-small-plus txt-ui-fg-base">
                    Categories
                  </span>
                  <ul
                    className="grid grid-cols-1 gap-2"
                    data-testid="footer-categories"
                  >
                    {product_categories.slice(0, 6).map((c) => {
                      if (c.parent_category) {
                        return null;
                      }

                      const children =
                        c.category_children?.map((child) => ({
                          name: child.name,
                          handle: child.handle,
                          id: child.id,
                        })) || null;

                      return (
                        <li
                          className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
                          key={c.id}
                        >
                          <LocalizedClientLink
                            className={clx(
                              "hover:text-ui-fg-base",
                              children && "txt-small-plus"
                            )}
                            href={`/categories/${c.handle}`}
                            data-testid="category-link"
                          >
                            {c.name}
                          </LocalizedClientLink>
                          {children && (
                            <ul className="grid grid-cols-1 ml-3 gap-2">
                              {children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {collections && collections.length > 0 && (
                <div className="flex flex-col gap-y-2">
                  <span className="txt-small-plus txt-ui-fg-base">
                    Collections
                  </span>
                  <ul
                    className={clx(
                      "grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small",
                      {
                        "grid-cols-2": collections.length > 3,
                      }
                    )}
                  >
                    {collections.slice(0, 6).map((c) => (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className="hover:text-ui-fg-base"
                          href={`/collections/${c.handle}`}
                        >
                          {c.title}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">Useful info.</span>
                <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                  <li>
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-ui-fg-base"
                    >
                      Privacy policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/terms-conditions"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-ui-fg-base"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      href="/refund-policy"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-ui-fg-base"
                    >
                      Refund Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/shipping-policy"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-ui-fg-base"
                    >
                      Shipping Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/au/contact-us"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-ui-fg-base"
                    >
                      Contact us
                    </a>
                    </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
            <Text className="txt-compact-small">
              © {new Date().getFullYear()} SecretGreen.com.au All rights reserved.
            </Text>
            <MedusaCTA />
          </div>
        </div>
      </footer>
    </>
  );
}
