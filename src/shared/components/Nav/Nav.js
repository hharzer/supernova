import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as S from './styles'
import { openModal } from 'app/store/app/actions'

const githubLink = 'https://github.com/yawnch/react-firebase-ssr-starter'

@connect(null, { openModal })
export default class Nav extends Component {
  openSignUpModal = () => {
    this.props.openModal({ modalName: 'SignUpModal' })
  }

  render () {
    return <S.NavComponent>
      <S.LogoLink to='/'>
        <S.StyledYawnchLogo />
        <S.LogoText>Yawnch</S.LogoText>
      </S.LogoLink>
      <S.NavItems>
        <S.NavA href={githubLink} target='_blank'>Github</S.NavA>
        <S.NavA href={githubLink} target='_blank'>Discord</S.NavA>
        <S.NavLink to='/admin'>Admin</S.NavLink>
        <S.NavButton onClick={this.openSignUpModal}>Sign up</S.NavButton>
      </S.NavItems>
    </S.NavComponent>
  }
}
