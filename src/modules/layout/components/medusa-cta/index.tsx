import { Text, IconBadge } from "@medusajs/ui"
import { Stripe, Mastercard, Visa, Klarna, VerifiedBadge } from "@medusajs/icons"

import Medusa from "../../../common/icons/medusa"
import NextJs from "../../../common/icons/nextjs"

const MedusaCTA = () => {
  return (
    <Text className="flex gap-x-2 txt-compact-small-plus items-center">
      Encrypted Payments, Secure Peace of Mind. 
<IconBadge>
  <Stripe />
</IconBadge>
<IconBadge>
  <Mastercard />
</IconBadge>
<IconBadge>
  <Visa />
</IconBadge>
<IconBadge>
  <Klarna />
</IconBadge>
<IconBadge>
  <VerifiedBadge />
</IconBadge>
 </Text>
  )
}

export default MedusaCTA
