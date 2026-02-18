import { Button } from "@heroui/react"
import Image from "next/image"
import { useRouter } from "next/router"

interface PropTypes {
    status: "Success" | "Failed"
}

const Activation = (props: PropTypes) => {
    const router = useRouter()

    const { status } = props

    return (
        <div className="flex flex-col w-screen items-center justify-center gap-10 p-4">
            <div className="flex flex-col items-center justify-center gap-10">
                <Image
                    src="/images/general/logo.svg"
                    alt="Logo"
                    width={180}
                    height={180}
                />
                <Image
                    src={status === "Success" ? "/images/illustrations/success.svg" : "/images/illustrations/pending.svg"}
                    alt="Success"
                    width={300}
                    height={300}
                />
            </div>
            <div className="flex flex-col items-center text-center gap-2">
                <h1 className="text-3xl font-bold text-danger">
                    {status === "Success" ? "Activation Success" : "Activation Failed"}
                </h1>
                <p className="text-xl font-bold text-default-500">
                    {status === "Success" ? "Thankyou for register account in Events." : "Confirmation code is invalid"}
                </p>
                <Button className="mt-4 w-fit" variant="bordered" color="danger" onClick={() => router.push("/")}>Back to Home</Button>
            </div>
        </div>
    )
}

export default Activation