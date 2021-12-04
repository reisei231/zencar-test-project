import RepairWizard from "../../../store/repairWizardStore";
function Plate(props) {
    return (
        <div className="wizard-item_wrapper__1OiJL" onClick={() => RepairWizard.setSubcategory(props.data.id, props.type)}>
            <div className="wizard-item_root__2exP0">   
                {!!props.data.image ? <div className="wizard-item_image__1yHcl">
                <   img src={props.data.image.file.url}></img>
                </div>: ''}
                <div className= {!!props.data.image ? "wizard-item_name__KeZRK": "wizard-item_name__KeZRK wizard-item_no_margin__3iC7i"}>
                {props.data.name}
                </div>
            </div>
        </div>
    )
}

export default Plate;