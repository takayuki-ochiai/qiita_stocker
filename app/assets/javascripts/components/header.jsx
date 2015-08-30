/**
 * @fileoverview ヘッダーのComponentのファイルです。
 * @author takayuki-ochiai
 */
var Header = React.createClass({
  render() {
    return (
      <header>
          <div className="header-container">
              <h1 className="header-container__logo">QiitaStocker</h1>
          </div>
      </header>
    )
  }
});

module.exports = Header;
