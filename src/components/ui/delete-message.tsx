export default function DeleteMessage(props:{module:string}){
    return (
        <>
            <div>
                <p>
                    Confirm Deletion of {props.module}: Are you sure you want to delete this {props.module} permanently?
                    If you are sure, please click the delete button, otherwise you can cancel by clicking the cross
                    above
                </p>
            </div>
        </>
    )
}