import OrganizationDetailsPage from "@/components/organization-details-page"

export default function OrganizationDetails({ params }: { params: { id: string } }) {
  return <OrganizationDetailsPage id={params.id} />
}
