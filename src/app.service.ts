import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Utils } from './helpers/utils';
import PivotTable, { IPivotConf } from 'high-performance-pivot';

@Injectable()
export class AppService {
  async getSimpleGroup() {
    const pivotConf: IPivotConf = {
      pivotColumn: {
        caseColumn: 'month',
        sumColumn: 'amount',
      },
      aggregation: ['amount'],
    };

    try {
      const data = Utils.generateData();

      const result = await PivotTable.getPivotData(data, pivotConf);

      return {
        originalDataSample: data.slice(0, 5),
        result,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  async getMultipleWithGroupBy() {
    const configs: IPivotConf[] = [
      {
        pivotColumn: {
          caseColumn: 'month',
          sumColumn: 'amount',
        },
        aggregation: ['amount', 'amountBudget', 'amountProjected'],
        groupBy: [
          'null AS parentId',
          '"categoryId_" || CAST(categoryId as INT) AS id',
          'category AS name',
        ],
      },
      {
        pivotColumn: {
          caseColumn: 'month',
          sumColumn: 'amount',
        },
        aggregation: ['amount', 'amountBudget', 'amountProjected'],
        groupBy: [
          '"categoryId_" || CAST(categoryId as INT) AS parentId',
          '"subcategoryId_" || CAST(subcategoryId as INT) AS id',
          'subcategory AS name',
        ],
      },
      {
        pivotColumn: {
          caseColumn: 'month',
          sumColumn: 'amount',
        },
        aggregation: ['amount', 'amountBudget', 'amountProjected'],
        groupBy: [
          '"subcategoryId_" || CAST(subcategoryId as INT) AS parentId',
          '"contractId_" || CAST(id as INT) AS id',
          'contractorName AS name',
        ],
      },
    ];

    try {
      const data = Utils.generateData();

      const allData = await PivotTable.getPivotDataFromMultipleConfigurations(
        data,
        configs,
      );

      return {
        result: allData.flat(),
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  async getSimpleWithGroupBy() {
    const pivotConf: IPivotConf = {
      pivotColumn: {
        caseColumn: 'type',
        sumColumn: 'amountBudget',
        values: {
          quota: ['PC', 'PP'],
          extra: ['PX'],
        },
      },
      aggregation: ['amount', 'amountProjected', 'amountBudget'],
      groupBy: ['month', 'state'],
      sortBy: ['origDate'],
    };

    try {
      const data = Utils.generateData();

      const result = await PivotTable.getPivotData(data, pivotConf);

      return {
        originalDataSample: data.slice(0, 5),
        result,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }
}
