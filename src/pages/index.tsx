import * as React from 'react'
import ReactEcharts from 'echarts-for-react';
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import * as echarts from 'echarts'

import Page from '../components/layout/Page'
import Container from '../components/layout/Container'
import { Lesson } from '../store/lessons/types'
import { fetchRequest } from '../store/lessons/actions'
import { ApplicationState, ConnectedReduxProps } from '../store'
import LoadingOverlay from '../components/data/LoadingOverlay'
import LoadingOverlayInner from '../components/data/LoadingOverlayInner'
import LoadingSpinner from '../components/data/LoadingSpinner'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: Lesson[]  
  errors: string | undefined
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps

// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://my.api.com'

class LessonsIndexPage extends React.Component<AllProps> {
  public componentDidMount() {
    this.props.fetchRequest()
  }

  private echartsReactRef: any;

  public render() {
    const { loading } = this.props

    return (
      <Page>
        <Container>
          <div>
            {loading && (
              <LoadingOverlay>
                <LoadingOverlayInner>
                  <LoadingSpinner />
                </LoadingOverlayInner>
              </LoadingOverlay>
            )}
            {this.renderData()}
          </div>
        </Container>
      </Page>
    )
  }

  private option: any = {
    title: {
      text: "Lessons Learned Dashboard",
      subtext: "Location by Year"
    },
    legend: {},
    tooltip: {
        trigger: 'axis',
        showContent: false
    },
    dataset: {
        source: [
            ['location', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['San Jose', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ['San Francisco', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ['Oakland', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ['Modesto', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
        ]
    },
    xAxis: {type: 'category'},
    yAxis: {gridIndex: 0},
    grid: {top: '55%'},
    series: [
        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
        {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            label: {
                formatter: '{b}: {@2012} ({d}%)'
            },
            encode: {
                itemName: 'location',
                value: '2012',
                tooltip: '2012'
            }
        }
    ]
  };

  private renderData() {
    const { loading, data } = this.props

    return (
      <div>
        <ReactEcharts
          option={this.option} 
          notMerge={true}
          lazyUpdate={true}
          style={{height: "800px"}}
          ref={(e) => {
              this.echartsReactRef = e;
              console.log(e);
          }}
          onEvents={{
            'updateAxisPointer': (event: any) => {
              var xAxisInfo = event.axesInfo[0];
              if (xAxisInfo) {
                  var dimension = xAxisInfo.value + 1;
                  this.echartsReactRef.getEchartsInstance().setOption({
                      series: {
                          id: 'pie',
                          label: {
                              formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                          },
                          encode: {
                              value: dimension,
                              tooltip: dimension
                          }
                      }
                  });
              }
          }
          }}
        />
      </div>
    )
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ lessons }: ApplicationState) => ({
  loading: lessons.loading,
  errors: lessons.errors,
  data: lessons.data
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(fetchRequest())
})

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonsIndexPage)