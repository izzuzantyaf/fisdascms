import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
import {
  Organigram,
  OrganigramValidationError,
} from "../core/types/organigram.type"

export default function OrganigramPage() {
  const [isOrganigramUpdating, setIsOrganigramUpdating] = useState(false)
  const [organigramState, setOrganigramState] = useState<Organigram>()
  const toast = useToast()
  const [validationError, setValidationError] =
    useState<OrganigramValidationError>()
  const [canSubmit, setCanSubmit] = useState(false)

  const getOrganigram = async () => {
    const organigram = await organigramService.getAll()
    setOrganigramState(organigram)
  }

  const validateUrl = () => {
    if (organigramState?.url)
      try {
        new URL(organigramState?.url)
        setValidationError(undefined)
      } catch (e) {
        // setIsError(true)
      }
  }

  const handleUpdateOrganigram = async () => {
    setIsOrganigramUpdating(true)
    const updateResponse = await organigramService.update({
      _id: organigramState?._id as string,
      url: organigramState?.url,
    })
    setIsOrganigramUpdating(false)
    if (!updateResponse.isSuccess) {
      setValidationError(updateResponse.data.validationError)
      toast({
        title: updateResponse.message,
        status: "error",
      })
      return
    }
    setValidationError(undefined)
    const updatedOrganigram = updateResponse.data
    setOrganigramState(updatedOrganigram)
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
          <Skeleton isLoaded={organigramState ? true : false}>
            <iframe
              src={organigramState?.previewUrl}
              width="100%"
              height="556px"
            ></iframe>
          </Skeleton>
          <form>
            <Skeleton isLoaded={organigramState ? true : false}>
              <FormControl isInvalid={validationError?.url ? true : false}>
                <FormLabel>Link File</FormLabel>
                <Input
                  type="url"
                  placeholder="Link Google Drive organigram"
                  defaultValue={organigramState?.url}
                  onFocus={(e: any) => e.target.select()} //* select all ketika user klik input field
                  onChange={(e: any) => {
                    setOrganigramState((prevState) => {
                      prevState.url = e.target.value
                      return prevState
                    })
                    setCanSubmit(true)
                  }}
                />
                {validationError?.url ? (
                  <FormErrorMessage color="red.500">
                    {validationError.url}
                  </FormErrorMessage>
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
              onClick={(e: any) => {
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
