
import { Database } from '../interface'

const InternalServerError = (props: Database['products']['error']) => {
    return (
        <div>
            <p>
                {props?.status} {props?.message}
            </p>
        </div>
    )
}

export default InternalServerError