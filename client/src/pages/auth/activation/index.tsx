"use client"

import AuthLayout from "@/components/layouts/AuthLayout"
import Activation from "@/components/views/Auth/Activation"
import authServices from "@/services/auth.service"

interface PropTypes {
    status: "Success" | "Failed"
}

const ActivationPage = (props: PropTypes) => {
    return (
        <AuthLayout title="Events | Activation">
            <Activation {...props} />
        </AuthLayout>
    )
}

export async function getServerSideProps(context: { query: { code: string } }) {
    try {

        const result = await authServices.activation({ code: context.query.code })
        console.log(result.data)


        if (result.data.data) {
            return {
                props: {
                    status: "Success"
                }
            }
        } else {
            return {
                props: {
                    status: "Failed"
                }
            }
        }

    } catch (error) {

        return {
            props: {
                status: "Failed"
            }
        }
        
    }
}

export default ActivationPage