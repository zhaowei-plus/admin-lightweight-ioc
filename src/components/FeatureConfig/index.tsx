import React, { useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Modal, message } from 'antd'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createAsyncFormActions,
  FormSpy,
} from '@formily/antd'
import {
  FormStep,
  FormTab,
  ArrayTable,
} from '@formily/antd-components'
import http from '@/api'
import { Layout } from '@/components'
import components from './form'
import useEffects from './effects'
import { STEP_INFO } from './constant'
import BaseInfo from './components/BaseInfo'
import SourceMean from './components/SourceMean'
import ChartConfig from './components/ChartConfig'
import './index.less'

interface IProps {
  id?: number
  groupId?: number
  title?: string
  isAdd?: boolean
  isDetail?: boolean
  isEdit?: boolean
  history?: any
}

const { Content, Footer } = Layout

const transformParams = (params) => {
  const { outerParams = [], ...rest } = params
  if (Array.isArray(outerParams) && outerParams.length > 0) {
    rest.outerParams = JSON.stringify(outerParams)
  }
  return rest
}

const FeatureConfig = (props: IProps) => {
  const { id, groupId, title, isAdd = false, isEdit = false, isDetail = false } = props

  const history = useHistory()
  const [detail, setDetail] = useState<any>()
  const [loading, setLoading] = useState(!isAdd)
  const actions = useMemo(() => createAsyncFormActions(), [])

  const fetchDetail = (id) => {
    return http.get('featureConfig/detail', { id }).then(res => {
      setDetail(res.data)
    }).finally(() => {
      setLoading(false)
    })
  }

  const handleSaveAndNext = (step) => {
    // 第一步
    if (step === 0) {
      return actions.submit().then(({ values }: any) => {
        return http.post('featureConfig/save/step1', transformParams(values)).then(res => {
          message.success('保存成功')
          actions.dispatch(FormStep.ON_FORM_STEP_NEXT, undefined)
          return actions.setFieldState('id', state => {
            state.value = res.data
          })
        })
      })
    }

    // 第二步
    if (step === 1) {
      return actions.submit().then(({ values }: any) => {
        const params = transformParams(values)
        return http.post('featureConfig/save/step2', params).then(() => {
          message.success('保存成功')
          actions.dispatch(FormStep.ON_FORM_STEP_NEXT, undefined)
        })
      })
    }
  }

  const handleSaveAndPublish = () => {
    return actions.submit().then(({ values }: any) => {
      const params = transformParams(values)
      return http.post('featureConfig/save/step3', { ...params, signStatus: 1 }).then(() => {
        message.success('保存并发布成功')
        history.goBack()
      })
    })
  }

  const handleSave = (step) => {
    return actions.submit().then(({ values }: any) => {
      const params = transformParams(values)
      // 第一步
      if (step === 0) {
        return http.post('featureConfig/save/step1', params).then(res => {
          message.success('保存成功')
          return actions.setFieldState('id', state => {
            state.value = res.data
          })
        })
      }

      // 第二步
      if (step === 1) {
        return http.post('featureConfig/save/step2', params).then(() => {
          message.success('保存成功')
        })
      }

      // 第三步
      if (step === 2) {
        params.signStatus = 0
        return http.post('featureConfig/save/step3', params).then(() => {
          message.success('保存成功，在未发布中查看')
          history.goBack()
        })
      }
    })
  }

  const handleCancel = () => {
    Modal.confirm({
      centered: true,
      title: '提示',
      content: '确定要返回吗？',
      onOk: () => history.goBack(),
    })
  }

  useEffect(() => {
    if (id) {
      fetchDetail(id)
    }
  }, [id])

  const initialValues = useMemo(() => {
    if (isDetail || isEdit) {
      if (detail) {
        const { outerParams = '[]', ...rest } = detail
        rest.outerParams = JSON.parse(outerParams)
        return rest
      }
    } else {
      return {
        classificationId: Number(groupId),
      }
    }
  }, [isDetail, isEdit, detail])
  const editable = isAdd || isEdit
  return (
    <Content
      back
      title={title}
      loading={loading}
    >
      <SchemaForm
        labelCol={8}
        wrapperCol={24}
        actions={actions}
        effects={useEffects}
        editable={editable}
        previewPlaceholder="暂无配置"
        initialValues={initialValues}
        className="feature-config-form"
        components={{ ...components, ArrayTable }}
      >
        <Field
          name="id"
          type="string"
          display={false}
        />
        {
          editable && (
            <>
              <FormStep
                name="step"
                dataSource={STEP_INFO}
                className="feature-config-form__step"
              />
              <BaseInfo />
              <SourceMean />
              <ChartConfig />
            </>
          )
        }
        {
          isDetail && (
            <FormTab className="feature-config-form__tabs">
              <FormTab.TabPane
                name={STEP_INFO[0].name}
                tab={STEP_INFO[0].title}
              >
                <BaseInfo />
              </FormTab.TabPane>
              <FormTab.TabPane
                name={STEP_INFO[1].name}
                tab={STEP_INFO[1].title}
              >
                <SourceMean />
              </FormTab.TabPane>
              <FormTab.TabPane
                name={STEP_INFO[2].name}
                tab={STEP_INFO[2].title}
              >
                <ChartConfig />
              </FormTab.TabPane>
            </FormTab>
          )
        }
        <FormSpy selector={FormStep.ON_FORM_STEP_CURRENT_CHANGE}>
          {({ state }) => {
            const { value = 0 } = state
            return (
              <Footer hidden={!editable}>
                <Button onClick={handleCancel}>
                  取消
                </Button>
                <Button
                  type="primary"
                  onClick={() => handleSave(value)}
                >
                  保存
                </Button>
                {[0, 1].includes(value) && (
                  <Button
                    type="primary"
                    onClick={() => handleSaveAndNext(value)}
                  >
                    保存并下一步
                  </Button>
                )}
                {value === 2 && (
                  <Button
                    type="primary"
                    onClick={handleSaveAndPublish}
                  >
                    保存并发布
                  </Button>
                )}
              </Footer>
            )
          }}
        </FormSpy>
      </SchemaForm>
    </Content>
  )
}

export default FeatureConfig
