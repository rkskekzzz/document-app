import styled from 'styled-components'

export const Container = styled.div`
  overflow: auto;

  [cmdk-root] {
    display: flex;
    flex-direction: column;
    height: inherit;
  }

  [cmdk-group-heading] {
    padding: 0 12px;
    color: var(--txt-black-dark, var(--txt-black-dark));
    font-feature-settings:
      'clig' off,
      'liga' off;
    font-size: 14px;
    font-style: normal;
    line-height: 20px;
  }

  [cmdk-item] {
    content-visibility: auto;
    margin-top: 8px;
    padding: 8px;
    border-radius: var(--radius-8);
    cursor: pointer;
    user-select: none;

    &[data-selected='true'] {
      background-color: var(--bg-black-lighter);
    }
  }

  [cmdk-list] {
    flex: 1;
    height: inherit;
    padding: 0 20px;
    overflow: auto;
    overscroll-behavior: contain;
  }

  [cmdk-empty] {
    position: absolute;
    top: calc(50% + 20px);
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    white-space: pre-wrap;
    transform: translate(-50%, -50%);
  }
`
