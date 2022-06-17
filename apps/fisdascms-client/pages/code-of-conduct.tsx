import Head from "next/head"
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  SimpleGrid,
  Skeleton,
  useToast,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { codeOfConductService } from "../services/code-of-conduct.service"
import PageLayout from "../layouts/page-layout"
import shadowedBoxStyle from "../chakra-style-props/shadowed-box"

export default function CodeOfCoductPage() {
  const [isCodeOfConductUpdating, setIsCodeOfConductUpdating] = useState(false)
  const [codeOfConductState, setCodeOfConductState] = useState()
  const toast = useToast()
  const [isError, setIsError] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)

  const getCodeOfConduct = async () => {
    const codeOfConduct = await codeOfConductService.getAll()
    setCodeOfConductState(codeOfConduct)
  }

  const validateUrl = () => {
    if (codeOfConductState?.url)
      try {
        new URL(codeOfConductState?.url)
        setIsError(false)
      } catch (e) {
        // setIsError(true)
      }
  }

  const handleUpdateCodeOfConduct = async () => {
    const newCodeOfConduct = {
      _id: codeOfConductState._id,
      url: codeOfConductState.url,
    }
    setIsCodeOfConductUpdating(true)
    const updateResponse = await codeOfConductService.update(newCodeOfConduct)
    setIsCodeOfConductUpdating(false)
    if (!updateResponse.isSuccess) {
      setIsError(true)
      toast({
        title: updateResponse.message,
        status: "error",
      })
      return
    }
    setCodeOfConductState(updateResponse?.data?.updatedCodeOfConduct)
    toast({
      title: updateResponse.message,
      status: "success",
    })
    setCanSubmit(false)
  }

  useEffect(() => {
    getCodeOfConduct()
  }, [])

  useEffect(() => {
    validateUrl()
  }, [codeOfConductState])

  return (
    <>
      <Head>
        <title>Tata Tertib | Fisdas CMS</title>
      </Head>
      <PageLayout>
        <Heading marginTop="4">Tata tertib</Heading>
        <SimpleGrid
          columns={[1, 2]}
          gap={4}
          marginTop="4"
          padding="4"
          {...shadowedBoxStyle}
        >
          <Skeleton isLoaded={codeOfConductState}>
            <iframe
              src={codeOfConductState?.previewUrl}
              width="100%"
              height="256px"
            ></iframe>
          </Skeleton>
          <form action="#">
            <Skeleton isLoaded={codeOfConductState}>
              <FormControl isInvalid={isError}>
                <Input
                  type="url"
                  placeholder="Link Google Drive file tata tertib"
                  defaultValue={codeOfConductState?.url}
                  onFocus={(e) => e.target.select()} //* select all ketika user klik input field
                  onChange={(e) => {
                    setCodeOfConductState({
                      ...codeOfConductState,
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
              isDisabled={!canSubmit}
              isLoading={isCodeOfConductUpdating}
              onClick={(e) => {
                e.preventDefault()
                handleUpdateCodeOfConduct()
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
