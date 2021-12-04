import * as React from "react";
import { observer } from "mobx-react";

import Header from './components/header';
import RepairWizard from './components/RepairWizard';

import './index.css';
import './ui-kit.css'

@observer
class App extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page_root__3Zvv2">
          <Header />
          <div className="page_content__1msGg">
            <div className="page_view__1mFYv">
              <div>
                <RepairWizard />
              </div>
            </div>
          </div>
      </div>
    )
  }
}
// const App = observer(() => {
//   return (
//     <div className="page_wrapper">
//       <Header />
//       <div className="content_wrapper">
//           <div className="view">
//             <RepairWizard />
//           </div>
//       </div>
//     </div>
//   );
// })

export default App;
