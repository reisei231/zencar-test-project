import { gql, useQuery } from '@apollo/client';
import { observer } from "mobx-react";
import React from "react";

import Plate from '../../plate';

import repairWizardStore from '../../../../store/repairWizardStore';

const GET_WORKS = gql`
    query {
        wizardWorks {
            name,
            id,
            question,
            image {
                file {
                    url
                }
            }
        }
    }
`;

const GET_SYMPTOMS = gql`
    query {
        wizardSymptoms{
            name,
            id,
            question,
            image {
                file {
                    url
                }
            }
        }
    }
`;

const Plates = observer((props) => {
    const { loading, error, data} = useQuery(props.query);

    if(loading) return 'loading';
    if(error) return `Error! ${error}`;
    console.log(data);
    if(data.hasOwnProperty('wizardWorks')) {
        return data.wizardWorks.map((el) => <Plate  data={el} type={'wizardWorks'}/>)
    } else {
        return data.wizardSymptoms.map((el) => <Plate  data={el} type={'wizardSymptoms'}/>)
    }
    
})

@observer
class Services extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="repair-wizard-works_root__2GuKm">
                <div className="wizard_root__3Oi9I">
                    <div className="wizard_header__362Bq">
                        <div className="wizard_middle__1iiRd">
                            <div className="wizard_question__2w-xE">
                                {repairWizardStore.subcategoryType === 'wizardWorks' ? 'Какой узел автомобиля нуждается в ремонте?' : 'Какой симптом описывает проблему с вашим автомобилем?'}
                            </div>
                        </div>
                        <div className="wizard_right__3DTvd">
                            <div className="ui-grouped-buttons_root__Xrjsm">
                                <div className={repairWizardStore.subcategoryType !== 'wizardWorks' ? "ui-grouped-buttons_button__3zPT8" : "ui-grouped-buttons_button__3zPT8 ui-grouped-buttons_active__48Fx-"} onClick={() => repairWizardStore.setSubcategory(-1, 'wizardWorks')}>
                                    <div className="ui-grouped-buttons_content__3mESo">
                                        Выбрать услуги
                                    </div>
                                </div>
                                <div className={repairWizardStore.subcategoryType === 'wizardWorks' ? "ui-grouped-buttons_button__3zPT8" : "ui-grouped-buttons_button__3zPT8 ui-grouped-buttons_active__48Fx-"} onClick={() => repairWizardStore.setSubcategory(-1, 'wizardSymptoms')}>
                                    <div className="ui-grouped-buttons_content__3mESo">
                                        Описать симптомы
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="repair-wizard-works_search__guaSy">
                        <div>
                            <div className="ui-search_root__DWZBp ui-search_big__2xjKF">
                                <div className="ui-search_header__YkAyi">
                                <div className="ui-search_icon__1T_Yf"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></div>
                                <div className="ui-search_input__1cHW5">
                                    <div className="ui fluid input">
                                        <input placeholder="Начните вводить название работы или симптом неисправности" type='text'></input>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="wizard_items__29imP">
                    <Plates query={repairWizardStore.subcategoryType !== 'wizardWorks' ? GET_SYMPTOMS : GET_WORKS} />
                    </div>
                </div>
                <div className="repair-wizard-common_actions__1G3d9 repair-wizard-works_back_to_works__1Yz-3" style={{display: !!localStorage.getItem('services') && JSON.parse(localStorage.getItem('services')).length !== 0 ? 'flex' : 'none'}} onClick={() => repairWizardStore.setStage(3)}>
                    <button className="ui small basic button">
                    <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
                    <span className="repair-wizard-common_divider__1B-B-"></span>
                    К списку выбранных услуг
                    </button>
                </div>  
            </div>
        )
    }
}

export default Services;