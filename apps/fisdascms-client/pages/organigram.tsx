import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  ListItem,
  OrderedList,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
          {/* Organigram preview */}
          <Skeleton isLoaded={organigramState ? true : false}>
            <iframe
              src={organigramState?.previewUrl}
              width="100%"
              height="556px"
            ></iframe>
          </Skeleton>
          {/* Organigram preview ends */}

          <Box>
            {/* Petunjuk */}
            <Box
              className="guide"
              bgColor="blue.50"
              padding="8px"
              paddingX="12px"
              borderRadius="8px"
            >
              <Box className="guide-header" display="flex" alignItems="center">
                <Icon marginRight="8px" color="blue.500" fontSize="xl">
                  <FontAwesomeIcon icon="circle-info" />
                </Icon>
                <Heading size="sm" color="gray.600">
                  Petunjuk
                </Heading>
              </Box>
              <OrderedList fontSize="14px" marginTop="8px">
                <ListItem>
                  Upload file organigram (pdf/jpg/png) ke Google Drive
                </ListItem>
                <ListItem>Ubah akses file menjadi public</ListItem>
                <ListItem>
                  Copy paste link file organigram ke field di bawah ini
                </ListItem>
              </OrderedList>
            </Box>
            {/* Petunjuk ends */}
            {/* Organigram form */}
            <form id="organigram-form" style={{ marginTop: "8px" }}>
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
                        if (prevState) prevState.url = e.target.value
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
            </form>
            {/* Organigram form ends */}
            <Button
              form="organigram-form"
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
          </Box>
        </SimpleGrid>
      </PageLayout>
    </>
  )
}
