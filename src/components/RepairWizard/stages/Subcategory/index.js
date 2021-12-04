import gql from 'graphql-tag';
import repairWizardStore from '../../../../store/repairWizardStore'
import { useQuery } from '@apollo/client';

import Plate from '../../plate';
import { observer } from 'mobx-react-lite';

const InputArea = observer(() => {
    const query = gql`
        query {
            ${repairWizardStore.subcategoryType}(where: {id: {eq: ${repairWizardStore.subcategoryId}}}) {
                name,
                vehicleWorks {
                    name,
                    action
                    group {
                        name
                    }
                }
            }
        }
    `;

    const { loading, error, data} = useQuery(query);

    if(loading) return 'loading';
    if(error) return `Error! ${error}`;
    
    function addService(vehicleWorks) {
        let services = !!localStorage.getItem('services') ? JSON.parse(localStorage.getItem('services')): [];
        vehicleWorks.forEach((work) => {
            services.push({action: work.action, id: repairWizardStore.subcategoryId, name: work.name, group: !!work.group ? work.group.name : ''});
            repairWizardStore.item++;
        });
        localStorage.setItem('services', JSON.stringify(services));
        repairWizardStore.nextStage();
    }
    let text = '';
    if(data[repairWizardStore.subcategoryType][0].vehicleWorks.length == 0) {
        return (
            <div className={'wizard_custom_work__jNyP6'}>
                <textarea onChange={(el) => text = el.target.value}></textarea>
                <div className={'wizard_actions__DYolX'}>
                    <button className="ui teal small button" onClick={() => {
                        addService([{action: 'Другое', name: text, work: { group: ''}}])
                    }}>
                    <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                    Добавить
                    </button>
                </div>
            </div>
        )
    } else {
        addService(data[repairWizardStore.subcategoryType][0].vehicleWorks);
        return null;
    }
})

const FlowPart = (props) => {
    let part = !!props.part ? props.part : [];
    const query = gql`
        query {
            ${repairWizardStore.subcategoryType}(where : { id: {eq: ${props.id}}}) {
                name,
                id,
                parent {
                    name,
                    id
                }
            }
        }
    `;
    const { loading, error, data} = useQuery(query);
    if(loading) return 'loading';
    if(error) return `Error! ${error}`;
    
    function unique(arr) {
        let result = [];
        let resultNames = []
        for (let obj of arr) {
          if (!resultNames.includes(obj.id)) {
            resultNames.push(obj.id)
            result.push(obj);
          }
        }
        return result;
      }

    if(!!data[repairWizardStore.subcategoryType][0].parent) {
        part.push({name: data[repairWizardStore.subcategoryType][0].name, id: data[repairWizardStore.subcategoryType][0].id});
        return <FlowPart part={part} id={data[repairWizardStore.subcategoryType][0].parent.id}/>
    } else {
        part.push({name: data[repairWizardStore.subcategoryType][0].name, id: data[repairWizardStore.subcategoryType][0].id});
        return unique(part.reverse()).map((el, index) => {
            return (
                <div className="wizard_breadcrumb__1twwJ">
                    <div className="wizard_breadcrumb_name__2pCJu" onClick={()=> {
                        if(index -1 !== part.length) {
                            repairWizardStore.setSubcategory(el.id, repairWizardStore.subcategoryType);
                        }
                    }}>
                        {el.name}
                    </div>
                    <div class="wizard_breadcrumb_arrow__2uQ8H"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 17l5-5-5-5v10z"></path></svg></div>
                </div>
            )
        })
    }
}

const Flow = (props) => {
    return (
        <div className="wizard_breadcrumbs__3h-vl">
            <FlowPart id={props.id}/>
        </div>
    )
}

const Back = () => {
    const query = gql`
        query {
            ${repairWizardStore.subcategoryType}(where: {id: {eq: ${repairWizardStore.subcategoryId}}}) {
                parent {
                    id
                }
            }
        }
    `;
    const { loading, error, data} = useQuery(query);

    if(loading) return 'loading';
    if(error) return `Error! ${error}`;
    console.log(data);
    const id = !!data[repairWizardStore.subcategoryType][0].parent ? data[repairWizardStore.subcategoryType][0].parent.id : -1;
    // let id = 2;
    return (
        <div className="wizard_back__IJN4B">
            <div className="ui-circle-button_root__1I99y ui-circle-button_medium__3FkZ-">
                <button className="ui-circle-button_button__1arY2" onClick={() => repairWizardStore.setSubcategory(id, repairWizardStore.subcategoryType)}>
                    <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
                </button>
            </div>
        </div>
    )
}

const Subcategory = observer((props) => {
    const query = gql`
        query {
            ${repairWizardStore.subcategoryType}(where: {parentId: {eq: ${repairWizardStore.subcategoryId}}}) {
                name,
                id,
                image {
                    file {
                        url
                    }
                }
                parent {
                    id,
                    name,
                    question,
                    parent {
                        id
                    }
                }

            }

        }
    `;
    
    const { loading, error, data} = useQuery(query);

    if(loading) return 'loading';
    if(error) return `Error! ${error}`;
    
    function back() {
        if(!!data[repairWizardStore.subcategoryType][0].parent.parent) {
            repairWizardStore.setSubcategory(data[repairWizardStore.subcategoryType][0].parent.parent.id, repairWizardStore.subcategoryType);
        } else {
            repairWizardStore.prevStage()
        }
    }
    
    return (
        <div className="repair-wizard-works_root__2GuKm">
                <div className="wizard_root__3Oi9I">
                    <div className="wizard_header__362Bq">
                        <Back />
                        <div className="wizard_middle__1iiRd">
                            <Flow id={repairWizardStore.subcategoryId}/>
                            <div className="wizard_question__2w-xE">
                                {!!data[repairWizardStore.subcategoryType][0] ? data[repairWizardStore.subcategoryType][0].parent.question + '?': 'Опишите своими словами'}
                            </div>
                        </div>
                    </div>
                    <div className="wizard_items__29imP">
                        {data[repairWizardStore.subcategoryType].map((el) => <Plate  data={el} type={repairWizardStore.subcategoryType} />)}
                    </div>
                    {!!data[repairWizardStore.subcategoryType][0] ? null : <InputArea />}
                </div>
            </div>
    )
})

export default Subcategory;