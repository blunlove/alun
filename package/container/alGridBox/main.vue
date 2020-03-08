<script>
  import {checkType} from 'alun-utils';
  // const DEFAULT_ROW_RULE = function (item, index) {
  //   return index;
  // };
  const DEFAULT_COL_RULE = function (item, index, defaultReturn) {
    return defaultReturn;
  };
  function widthDistribution(row) {
    let arr = [];
    if (Array.isArray(row)) {
      let avg = Math.floor(24 / row.length);
      let rest = 24 - avg * row.length;
      row.forEach(()=>{
        if (rest) {
          arr.push(avg + 1);
          rest--;
        } else {
          arr.push(avg);
        }
      });
    }
    return arr;
  }
  function sortRow(num, index) {
    return Math.ceil((index + 1) / num) - 1;
  }
  export default {
    name: 'alGridBox',
    props: {
      data: {
        type: Array,
        default: ()=>[]
      },
      columnNum: {
        type: Number,
        default: 1
      },
      rowRule: {
        type: Function,
        // default: DEFAULT_ROW_RULE
      },
      colRule: {
        type: Function,
        default: DEFAULT_COL_RULE
      }
    },
    render(h) {
      return (
        <div class="al-grid-box">
          {
            this._l(this.rows, (row)=>{
              let arr_width = widthDistribution(row);
              return (
                <el-row>
                  {
                    this._l(row, ((item, index) => item ? (
                      <el-col span={this.colRule(item, index, arr_width[index] || 24, arr_width)}>
                        {this.$scopedSlots.default({item})}
                      </el-col>
                    ) : undefined))
                  }
                </el-row>
              );
            })
          }
        </div>
      );
    },
    computed: {
      rows() {
        let _rows = this.data.reduce((arr, item, index) => {
          let _index = this.rowRule ? this.rowRule(item, index) : sortRow(this.columnNum, index);
          if (!checkType(arr[_index], 'Array')) {
            arr[_index] = [];
          }
          arr[_index].push(item);
          return arr;
        }, []);
        // 解决使用快速分列时，最后一列数量不满时，会出现宽度与其他模块不同的问题
        if (!this.rowRule) {
          _rows.map(row=>{
            if (row && row.length) {
              let remainder = row.length % this.columnNum;
              if (remainder > 0) {
                for (let i = 0; i < this.columnNum - remainder; i++) {
                  row.push(undefined);
                }
              }
            }
          });
        }
        return _rows;
      }
    },
    data: function () {
      return {};
    },
    created() {
    },
    methods: {}
  };
</script>
