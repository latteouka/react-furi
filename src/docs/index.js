import React from 'react';
import { render } from 'react-dom';
import Highlight from 'react-highlight.js';
import { Toggle } from 'react-powerplug';
import styled, { injectGlobal } from 'styled-components';
import ReactFuri from '../index';

// eslint-disable-next-line
injectGlobal`
  font-family: 'Nunito Sans','Liberation Sans', TakaoPGothic, system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Cantarell,'Helvetica Neue',sans-serif;
  *[lang="ja"] {
    font-family: 'ヒラギノ角ゴ ProN', 'Hiragino Kaku Gothic ProN', 'TakaoPゴシック' , TakaoPGothic, '游ゴシック', '游ゴシック体', YuGothic, 'Yu Gothic', 'メイリオ', Meiryo, 'ＭＳ ゴシック', 'MS Gothic', HiraKakuProN-W3, 'MotoyaLCedar', 'Droid Sans Japanese', sans-serif;
  }
`;

const Code = (codeString = '') => <Highlight language="javascript">{codeString}</Highlight>;

const Main = styled.main`
  max-width: 50rem;
  margin: 0 auto;
  padding: 1rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  padding-bottom: 2px;
  border-bottom: 1px solid lightGrey;
`;

const Demo = () => (
  <Main>
    <header>
      <h1>react-furi Demo</h1>
    </header>
    <Section>
      <SectionTitle>{'Unstyled <ruby> element for comparison'}</SectionTitle>
      {Code(`<ruby><rb>大人しい</rb><rt>おとなしい</rt></ruby>`)}
      <ruby style={{ fontSize: '1.5rem' }}>
        <rb>大人しい</rb>
        <rt>おとなしい</rt>
      </ruby>
    </Section>
    <Section>
      <SectionTitle>Specific furi location placement</SectionTitle>
      {Code(`<ReactFuri word="送り仮名" furi="0:おく;2:が;3:な" />`)}
      <ReactFuri word="送り仮名" furi="0:おく;2:が;3:な" />
      {Code(`<ReactFuri word="送り仮名" furi={{ 0:'おく', 2:'が', 3:'な' }} />`)}
      <ReactFuri word="送り仮名" furi={{ 0: 'おく', 2: 'が', 3: 'な' }} />
    </Section>
    <Section>
      <SectionTitle>Intelligent furigana placement via reading</SectionTitle>
      {Code(`<ReactFuri word="お陰" reading="おかげ" />`)}
      <ReactFuri word="お陰" reading="おかげ" />
      {Code(`<ReactFuri word="大人しい" reading="おとなしい" />`)}
      <ReactFuri word="大人しい" reading="おとなしい" />
      {Code(`<ReactFuri word="使い方" reading="つかいかた" />`)}
      <ReactFuri word="使い方" reading="つかいかた" />
      {Code(`<ReactFuri word="お見舞い" reading="おみまい" />`)}
      <ReactFuri word="お見舞い" reading="おみまい" />
    </Section>
    <Section>
      <SectionTitle>Avoids rendering redundant furigana</SectionTitle>
      {Code(`<ReactFuri word="アイスクリーム" reading="アイスクリーム" />`)}
      <ReactFuri word="アイスクリーム" reading="アイスクリーム" />
      {Code(`<ReactFuri word="すいか" reading="スイカ" />`)}
      <ReactFuri word="すいか" reading="スイカ" />
    </Section>
    <Section>
      <SectionTitle>Showfuri prop</SectionTitle>
      {Code(
        '<Toggle render={({ on, toggle }) => (\n' +
          '  <ReactFuri word="漢字" reading="かんじ" showFuri={on} onClick={toggle} />\n' +
          ')}/>'
      )}
      <Toggle
        render={({ on, toggle }) => (
          <ReactFuri
            style={{ cursor: 'pointer' }}
            word="漢字"
            furi="0:かん;1:じ"
            showFuri={on}
            onClick={toggle}
          />
        )}
      />
    </Section>
    <Section>
      <SectionTitle>Custom render prop</SectionTitle>
      {Code(
        `<ReactFuri \n` +
          `  word="割り箸"\n` +
          `  reading="わりばし"\n` +
          `  render={({ pairs }) => <pre>{JSON.stringify(pairs, null, 2)}</pre>}\n` +
          `/>`
      )}
      <ReactFuri
        word="割り箸"
        reading="わりばし"
        render={({ pairs }) => <pre>{JSON.stringify(pairs, null, 2)}</pre>}
      />
    </Section>
  </Main>
);

render(<Demo />, document.getElementById('app'));