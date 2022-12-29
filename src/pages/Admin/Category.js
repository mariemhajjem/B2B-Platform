import { SmileOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Modal, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategorie, updateCategorie } from '../../redux/reducers/categories';
import { clearError } from '../../redux/reducers/categories';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, open }) => {
  const prevOpenRef = useRef();
  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);
  const prevOpen = prevOpenRef.current;
  useEffect(() => {
    if (!open && prevOpen) {
      form.resetFields();
    }
  }, [form, prevOpen, open]);
};
const ModalForm = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  useResetFormOnCloseModal({
    form,
    open,
  });
  const onOk = () => {
    form.submit();
  };
  return (
    <Modal title="Sous catégorie" open={open} onOk={onOk} onCancel={onCancel}>
      <Form form={form} layout="vertical" name="userForm">
        <Form.Item
          name="category_name"
          label="Nom sous-catégorie"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ({ title, formData, visible, setIsAddVisible, isAdd }) => {
  const [open, setOpen] = useState(false);
  const [err, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError())
    let children = [];
    formData.category_children?.map(child => {
      children = [...children, child?.category_name];
    })
    setCategories(children)
  }, [])
  const popUp = (type) => {
    notification[type]({
      message: err,
    });
  };
  const showUserModal = () => {
    setOpen(true);
  };
  const hideUserModal = () => {
    setOpen(false);
  };
  const onFinish = ({ category_name }) => {
    console.log('onFinish:', formData, category_name, categories);

    const data = { ...formData, category_name, category_children: categories }
    try {
      if (isAdd) {
        dispatch(createCategorie(data));
      } else {
        dispatch(updateCategorie(data));
      }
    } catch (err) {
      console.log(err)
    }

  };
  return (
    <Modal
      title={title}
      open={visible}
      footer={null}
      onCancel={setIsAddVisible}
    >
      {err && popUp("error")}
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          if (name === 'userForm') {
            const { basicForm } = forms;
            const users = basicForm.getFieldValue('users') || [];
            basicForm.setFieldsValue({
              users: [...new Set(users).add(values?.category_name)],
            });
            setCategories(prev => [...new Set(prev).add(values?.category_name)])
            setOpen(false);
          }
        }}
      >
        <Form {...layout} initialValues={formData} name="basicForm" onFinish={onFinish}>
          <Form.Item
            name="category_name"
            label="Nom catégorie"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
         {/* <Form.Item
            label="Liste des sous-catégories"
            shouldUpdate={(prevValues, curValues) => prevValues.users !== curValues.users}
          >
            {({ getFieldValue }) => {
              // to show category_children u must flatten the array (remove category_name)
              let children = [];
              formData.category_children?.map(child => {
                children = [...children, child?.category_name];
              })
              const users = getFieldValue('users') || children;
              return users.length ? (
                <ul>
                  {users.map((user, index) => (
                    <li key={index} className="user">
                      {user}
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography.Text className="ant-form-text" type="secondary">
                  ( <SmileOutlined /> Aucune sous-catégorie. )
                </Typography.Text>
              );
            }}
          </Form.Item>*/}
           <Form.Item {...tailLayout}>
            <Button htmlType="submit" type="primary">
              Envoyer
            </Button>
            {/* <Button
              htmlType="button"
              style={{
                margin: '0 8px',
              }}
              onClick={showUserModal}
            >
              Ajouter sous-catégorie
            </Button> */}
          </Form.Item> 
        </Form>

        <ModalForm open={open} onCancel={hideUserModal} />
      </Form.Provider>
    </Modal>
  );
};
