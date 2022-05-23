import {
  Button,
  Heading,
  Input,
  SimpleGrid,
  Skeleton,
  useToast,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import shadowedBoxStyle from "../../chakra-style-props/shadowed-box"
import PageLayout from "../../layouts/page-layout"
import { useState, useEffect } from "react"
import { organigramService } from "../../services/organigram"

export default function OrganigramPage() {
  const [isOrganigramUpdating, setIsOrganigramUpdating] = useState(false)
  const [organigramState, setOrganigramState] = useState()
  const toast = useToast()

  useEffect(() => {
    const getOrganigram = async () => {
      const organigram = await organigramService.getAll()
      setOrganigramState(organigram)
    }
    getOrganigram()
  }, [])

  const handleUpdateOrganigram = async () => {
    const newOrganigram = {
      _id: organigramState._id,
      url: organigramState.url,
    }
    setIsOrganigramUpdating(true)
    const updateResponse = await organigramService.update(newOrganigram)
    setIsOrganigramUpdating(false)
    if (!updateResponse.isSuccess) {
      toast({
        title: updateResponse.message,
        status: "error",
      })
      return
    }
    setOrganigramState(updateResponse?.data?.updatedOrganigram)
    toast({
      title: updateResponse.message,
      status: "success",
    })
  }

  return (
    <>
      <Head>
        <title>Organigram | Fisdas CMS</title>
      </Head>
      <PageLayout>
        <Heading marginTop="4">Organigram</Heading>
        <SimpleGrid
          columns={[1, 2]}
          gap={4}
          marginTop="4"
          padding="4"
          {...shadowedBoxStyle}
        >
          <Skeleton isLoaded={organigramState}>
            <iframe
              src={organigramState?.previewUrl}
              width="100%"
              height="256px"
            ></iframe>
          </Skeleton>
          <form action="#">
            <Skeleton isLoaded={organigramState}>
              <Input
                type="url"
                placeholder="Link Google Drive organigram"
                defaultValue={organigramState?.url}
                onFocus={(e) => e.target.select()} //* select all ketika user klik input field
                onChange={(e) =>
                  setOrganigramState({
                    ...organigramState,
                    url: e.target.value,
                  })
                }
              />
            </Skeleton>
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              marginTop={4}
              isLoading={isOrganigramUpdating}
              onClick={(e) => {
                e.preventDefault()
                handleUpdateOrganigram()
              }}
            >
              Simpan
            </Button>
          </form>
        </SimpleGrid>
      </PageLayout>
    </>
  )
}
