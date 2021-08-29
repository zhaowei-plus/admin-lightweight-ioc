import React from 'react'
import { Link } from 'react-router-dom'
import { getProject } from '../../config'
import './index.less'

const Project = () => {
  const projectModule = getProject()
  function Module() {
    return (
      <>
        {projectModule &&
          projectModule.map(item => {
            return (
              <div key={item.key} className="module flex column js">
                <div className="module__header flex js">
                  <div className="icon">
                    <img src={item.icon} alt="" />
                  </div>
                  <div className="info">
                    <div className="info__title">{item.title}</div>
                    <div className="info__description">{item.description}</div>
                  </div>
                </div>
                <div className="module__list">
                  {item.children &&
                    item.children.map(childItem => {
                      return (
                        <Link to={childItem.path} key={childItem.key} className="item">
                          <div className="item__header">{childItem.title}</div>
                          <div className="item__content">{childItem.description}</div>
                        </Link>
                      )
                    })}
                </div>
              </div>
            )
          })}
      </>
    )
  }
  return <div className="project flex column js">{Module()}</div>
}

export default Project
