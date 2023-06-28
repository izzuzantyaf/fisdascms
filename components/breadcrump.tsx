import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import Link from "next/link"
import { breadcrumpStack, Route } from "../core/lib/constants"

export default function Breadcrump() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href={Route.HOME}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {/* {breadcrumpStack.find(bcItem => bcItem.path === location.pathname)?.values.map(bcItemValue => <BreadcrumbItem>
          <BreadcrumbLink as={Link} href={Route.HOME}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>)} */}
      </Breadcrumb>
    </>
  )
}
