import {
  Button,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  SimpleGrid,
  Skeleton,
  useToast,
} from "@chakra-ui/react"
import Head from "next/head"
import shadowedBoxStyle from "../chakra-style-props/shadowed-box"
import PageLayout from "../layouts/page-layout"
import { useState, useEffect } from "react"
import { organigramService } from "../core/services/organigram.service"

export default function OrganigramPage() {
  const [isOrganigramUpdating, setIsOrganigramUpdating] = useState(false)
  const [organigramState, setOrganigramState] = useState()
  const toast = useToast()
  const [isError, setIsError] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)

  const getOrganigram = async () => {
    const organigram = await organigramService.getAll()
    setOrganigramState(organigram)
  }

  const validateUrl = () => {
    if (organigramState?.url)
      try {
        new URL(organigramState?.url)
        setIsError(false)
      } catch (e) {
        // setIsError(true)
      }
  }

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
    setCanSubmit(false)
  }

  useEffect(() => {
    getOrganigram()
  }, [])

  useEffect(() => {
    validateUrl()
  }, [organigramState])

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
          <form>
            <Skeleton isLoaded={organigramState}>
              <FormControl isInvalid={isError}>
                <Heading size="sm">Link File</Heading>
                <Input
                  type="url"
                  placeholder="Link Google Drive organigram"
                  defaultValue={organigramState?.url}
                  onFocus={(e) => e.target.select()} //* select all ketika user klik input field
                  onChange={(e) => {
                    setOrganigramState({
                      ...organigramState,
                      url: e.target.value,
                    })
                    setCanSubmit(true)
                  }}
                />
                {isError ? (
                  <FormHelperText color="red.500">
                    Link tidak valid
                  </FormHelperText>
                ) : null}
              </FormControl>
            </Skeleton>
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              marginTop={4}
              isLoading={isOrganigramUpdating}
              isDisabled={!canSubmit}
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
