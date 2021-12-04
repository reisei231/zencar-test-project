import { observer } from "mobx-react-lite";

import repairWizardStore from '../../../../store/repairWizardStore'

function unique(arr) {
    console.log(arr);
    let result = [];
    let resultNames = []
    for (let obj of arr) {
      if (!resultNames.includes(obj.name)) {
        resultNames.push(obj.name)
        result.push(obj);
      }
    }
    return result;
}

const Service = observer((work) => {
    // console.log(work);
    function removeItem(id) {
        let items = unique(JSON.parse(localStorage.getItem('services')))
        items.forEach((el, index) => {
            if(el.id == id) {
                items.splice(index, 1)
            }
        })
        localStorage.setItem('services', JSON.stringify(items));
        repairWizardStore.item--;
    }
    return (
        <div className="vehicle-work_root__1cWet">
            <div className="vehicle-work_index__11dFP">{work.index+1}</div>
            <div className="vehicle-work_content__3GIX7">
                <div className="vehicle-work_top__9BzDf">
                    <span className="vehicle-work_group__17jNo">{work.work.group}</span>
                    <span class="vehicle-work_arrow__2qjsi"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 17l5-5-5-5v10z"></path></svg></span>
                    <span className="vehicle-work_name__1ApS9">{work.work.name}</span>
                </div>
            </div>
            <div onClick={() => removeItem(work.work.id)}><div class="ui-circle-button_root__1I99y ui-circle-button_medium__3FkZ-"><button class="ui-circle-button_button__1arY2 ui-circle-button_negative__3GcMy ui-circle-button_inverted__gDn16 ui-circle-button_transparent__3H4LM"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"></path></svg></button></div></div>
        </div>
    )
})

const Basket = observer(() => {
    
    let services = unique(JSON.parse(localStorage.getItem('services')));
    // console.log(services);
    if(services.length == 0) {
        repairWizardStore.setStage(1);
        return null
    } else {
        return (
            <div className="repair-wizard_step__4dlJ6 repair-wizard_active__1PB4a" id={repairWizardStore.item}>
                <div className="repair-wizard-works_root__2GuKm">
                    <div className="repair-wizard-common_block__2sciZ">
                        <div className="repair-wizard-common_block_title__7NFNx">
                            <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                            Выбранные услуги
                        </div>
                        <div className="ui-list_component__2kHXm">
                            {services.map((el,i) => <Service work={el} index={i}/>)}
                        </div>
                    </div>
                    <div className="repair-wizard-common_block__2sciZ">
                        <div className="repair-wizard-common_block_title__7NFNx">
                            <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path></svg>
                            Запчасти и расходники
                        </div>
                        <div className="repair-wizard-works_parts__2UQ3l">
                            <div class="ui checked radio checkbox"><input class="hidden" readonly="" tabindex="0" type="radio" value="BUY" checked></input><label>Приобрету в автосервисе</label></div>
                            <div class="ui radio checkbox"><input class="hidden" readonly="" tabindex="0" type="radio" value="OWN"></input><label>Привезу свои</label></div>
                            <div class="ui radio checkbox"><input class="hidden" readonly="" tabindex="0" type="radio" value="NOT_NEED"></input><label>Не нужны</label></div>
                        </div>
                    </div>
                    <div className="repair-wizard-common_actions__1G3d9">
                        <button class="ui small basic button" onClick={() => repairWizardStore.setStage(1)}><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg><span class="repair-wizard-common_divider__1B-B-"></span>Добавить еще услуги</button>
                        <button class="ui teal small button">Продолжить<span class="repair-wizard-common_divider__1B-B-"></span><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg></button>
                    </div>
                </div>
            </div>
        )
    }
    
})

export default Basket;