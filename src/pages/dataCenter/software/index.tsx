import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, ProCard } from '@ant-design/pro-components';
import { Space, Tag, message } from 'antd';
import { useContext, useRef, useState } from 'react';
import {
  convertToArray,
  dataTest,
  ColumnType,
  SearchSoftwareWritingType,
  getSoftwareWriting,
  updateSoftwareWriting,
  deleteSoftwareWriting,
} from './constants';
import Editable from './Editable';
import styles from './index.less';
import { history } from '@@/core/history';
import { AdminInfoContext } from '@/pages/centralAdministration';
import {
  requestDeleteSoftwareWriting,
  requestSoftwareWriting,
  requestUpdateSoftwareWriting,
} from '@/services/admin';
import { getCompanyList } from '@/pages/dataCenter/constants';

const PAGE_SIZE = 5;

const columns = (
  role: number,
): ProColumns<ColumnType & { indexNum: number }>[] => {
  //判断角色是否超级管理员 是的话多加列
  let obj: ProColumns<ColumnType & { indexNum: number }>[] =
    role === 3
      ? [
          {
            title: '公司名',
            dataIndex: 'companyId',
            ellipsis: true,

            hideInTable: true,
            valueType: 'select',
            request: getCompanyList,
            fieldProps: {
              showSearch: true,
              fieldNames: {
                label: 'name',
                value: 'companyId',
              },
              // allowClear: true,
              optionFilterProp: 'name',
            },
          },
          {
            title: '软著名称（模糊）',
            dataIndex: 'name',
            ellipsis: true,
            hideInTable: true,
          },
          {
            title: '所属公司',
            dataIndex: 'companyName',
            search: false,
            //fixed: 'left',
            editable: false,
            ellipsis: true,
          },
          {
            title: '起始日期',
            dataIndex: 'startTime',
            valueType: 'date',
            ellipsis: true,
            hideInTable: true,
            tip: '查询某个日期之后登记的软著',
          },
          {
            title: '结束日期',
            dataIndex: 'endTime',
            valueType: 'date',
            ellipsis: true,
            hideInTable: true,
            tip: '查询某个日期之前登记的软著',
          },
        ]
      : [];
  return [
    {
      title: '序号',
      dataIndex: 'indexNum',
      editable: false,
      search: false,
      fixed: 'left',
      width: 48,
      render: (_, record) => {
        const bgColor =
          record.indexNum % PAGE_SIZE > 3 || record.indexNum % PAGE_SIZE === 0
            ? { backgroundColor: '#979797' }
            : {};
        return (
          <div className={styles.index} style={bgColor}>
            {record.indexNum}
          </div>
        );
      },
    },
    {
      title: '软著名称',
      dataIndex: 'name',
      search: false,
      ellipsis: true,
      fixed: 'left',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    ...obj,
    {
      title: '版本号',
      search: false,
      dataIndex: 'versionNumber',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '登记编号',
      search: false,
      dataIndex: 'registrationNumber',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },

    {
      title: '登记日期',
      search: false,
      dataIndex: 'registrationTime',
      valueType: 'date',
      sorter: true,
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            console.log(record, 'softwriting');
            action?.startEditable?.(record.softwareWritingId!.toString());
          }}
        >
          编辑
        </a>,
      ],
    },
  ];
};
export default () => {
  const actionRef = useRef<ActionType>();
  const { userInfo } = useContext(AdminInfoContext);
  const onChangeTabs = (activeKey: string) => {
    activeKey === 'tab1' ? actionRef.current?.reload() : null;
  };
  if (!userInfo) return;
  return (
    <ProCard tabs={{ type: 'card', onChange: onChangeTabs }}>
      <ProCard.TabPane key="tab1" tab="信息管理">
        <ProTable<ColumnType & { indexNum: number }>
          columns={columns(userInfo.loginRole)}
          actionRef={actionRef}
          cardBordered
          request={async (params = {}, sort, filter) => {
            let apiParams =
              userInfo.loginRole === 2
                ? {
                    current: params.current!,
                    size: params.pageSize!,
                    companyId: userInfo?.companyId,
                  }
                : {
                    current: params.current!,
                    size: params.pageSize!,
                    companyId: params.companyId,
                    startTime: params.startTime,
                    endTime: params.endTime,
                    name: params.name,
                  };
            try {
              const res: SearchSoftwareWritingType = await getSoftwareWriting[
                userInfo.loginRole
              ](apiParams);
              if (typeof res === 'object' && 'code' in res) {
                message.error('token失效请重新登录');
                localStorage.clear();
                history.push(`/home`);
              }
              const data = res.records.map((data, index) => ({
                ...data,
                // ratio: parseFloat((data.ratio * 100).toFixed(2)), 有数字额外处理
                indexNum: index + 1 + (params.current! - 1) * PAGE_SIZE,
              }));

              return { data, success: true, total: res.total };
            } catch (e) {
              console.log(e);
            }
            return { data: [], success: true };
          }}
          editable={{
            type: 'multiple',
            onSave: async (key, row, originRow) => {
              console.log(key, row, originRow);

              try {
                const data = await updateSoftwareWriting[userInfo.loginRole](
                  row,
                );
                if (typeof data === 'object' && 'code' in data) {
                  message.error('保存失败');
                } else {
                  message.success('保存成功');
                }
                actionRef.current?.reload();
              } catch (e) {
                message.error('添加失败');
                console.log(e);
              }
            },
            onDelete: async (key, row) => {
              try {
                console.log(key, row, 'keyRow');
                const data = await deleteSoftwareWriting[userInfo.loginRole](
                  key.toString(),
                );
                if (typeof data === 'object' && 'code' in data) {
                  message.error('删除失败');
                } else {
                  message.success('删除成功');
                }
                actionRef.current?.reloadAndRest &&
                  actionRef.current?.reloadAndRest();
              } catch (e) {
                message.error('添加失败');
                console.log(e);
              }
            },
          }}
          columnsState={{
            persistenceKey: 'softwareWriting',
            persistenceType: 'localStorage',
            onChange(value) {
              console.log('value: ', value);
            },
          }}
          rowKey="softwareWritingId"
          search={
            userInfo.loginRole === 3
              ? {
                  labelWidth: 'auto',
                }
              : false
          }
          options={{
            setting: {
              listsHeight: 400,
            },
          }}
          pagination={{
            pageSize: PAGE_SIZE,
            onChange: (page) => console.log(page),
          }}
          dateFormatter="string"
          headerTitle="软著信息表格"
        />
      </ProCard.TabPane>
      {userInfo.loginRole === 2 && (
        <ProCard.TabPane key="tab2" tab="信息添加">
          <Editable userInfo={userInfo} />
        </ProCard.TabPane>
      )}
    </ProCard>
  );
};
