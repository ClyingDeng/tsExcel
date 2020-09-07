import { StoreDataModuleBase } from '../helper/StoreFactory';
import StoreConst from '../storeConst';

// tslint:disable-next-line: class-name
export class excelData {
  public data: object[] = [];
}
class StateDcvMain {
  public excel_Data: excelData = new excelData();
}
export const StoreData = new StoreDataModuleBase<StateDcvMain, any>(
  new StateDcvMain(),
  // getter
  {
    GetExcelData: (state: StateDcvMain, getters: any) => {
      return state.excel_Data;
    }
  },
  // mutiations
  {
    [StoreConst.UPDATE_DATA]: (state: StateDcvMain, value: excelData) => {
      state.excel_Data = value;
    }
  },
  // actions
  {
    [StoreConst.UPDATE_DATA_COMMIT]: ({ commit }: any, value: any) => {
      return new Promise((resolve, reject) => {
        commit('UpdateData', value);
        resolve();
      });
    }
  }
);
