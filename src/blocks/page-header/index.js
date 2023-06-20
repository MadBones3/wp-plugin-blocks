import { registerBlockType } from "@wordpress/blocks"
import { RichText, useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { __ } from "@wordpress/i18n"
import { PanelBody, ToggleControl } from "@wordpress/components"
import block from "./block.json"
import icons from "../../icons"
import "./main.css"

registerBlockType(block.name, {
  icon: icons.primary,
  edit({ attributes, setAttributes }) {
    const { content, showCategory } = attributes
    const blockprops = useBlockProps()

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("General", "udemy-plus")}>
            <ToggleControl
              label={__("Show Category", "udemy-plus")}
              checked={showCategory}
              onChange={showCategory => setAttributes({ showCategory })}
              help={
                showCategory
                  ? __("Category Shown", "udemy-plus")
                  : __("Custom content shown", "udemy-plus")
              }
            />
          </PanelBody>
        </InspectorControls>
        <div {...blockprops}>
          <div className="inner-page-header">
            {showCategory ? (
              <h1>{__("Category: Some Category", "udemy-plus")}</h1>
            ) : (
              <RichText
                tagName="h1"
                placeholder={__("Heading", "udemy-plus")}
                value={content}
                onChange={content => setAttributes({ content })}
              ></RichText>
            )}
          </div>
        </div>
      </>
    )
  }
})
