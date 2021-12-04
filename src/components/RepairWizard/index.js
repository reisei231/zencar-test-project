import { observer } from "mobx-react";
import React from "react";

import repairWizardStore from '../../store/repairWizardStore';

import Steps from "./steps";
import Services from "./stages/Services";
import Subcategory from "./stages/Subcategory";
import Basket from "./stages/Basket";

@observer
class RepairWizard extends React.Component {

    Stage = () => {
        console.log(repairWizardStore.stage);
        if(repairWizardStore.stage === 1) return <Services />
        if(repairWizardStore.stage === 2) return <Subcategory />
        if(repairWizardStore.stage === 3) return <Basket />
    }

    render() {
        return (
            <div className="view-hoc_component__kAgjV">
              <div className="view-hoc_content__rR2Z-">
                  <div className="repair-wizard_root__3t43K">
                      <Steps />
                      <div className="repair-wizard_step__4dlJ6 repair-wizard_active__1PB4a">
                        {this.Stage()}
                      </div>
                  </div>
              </div>
            </div>
        )
    }
}

export default RepairWizard;