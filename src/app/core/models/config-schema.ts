import { JsonSchema } from "json-schema-library";

export const CONFIG_SCHEMA: JsonSchema = {
    // "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "appName": {
            "type": "string"
        },
        "apiUrl": {
            "type": "string"
        },
        "auth": {
            "type": "object",
            "properties": {
                "enabled": {
                    "type": "boolean"
                },
                "url": {
                    "type": "string"
                },
                "entityName": {
                    "type": "string"
                }
            },
            "required": [
                "enabled",
                "url",
                "entityName"
            ]
        },
        "areas": {
            "type": "array",
            "items": [
                {
                    "type": "object",
                    "properties": {
                        "areaName": {
                            "type": "string"
                        },
                        "alias": {
                            "type": "string"
                        },
                        "sections": {
                            "type": "array",
                            "items": [
                                {
                                    "type": "object",
                                    "properties": {
                                        "sectionName": {
                                            "type": "string"
                                        },
                                        "alias": {
                                            "type": "string"
                                        },
                                        "list": {
                                            "type": "object",
                                            "properties": {
                                                "listName": {
                                                    "type": "string"
                                                },
                                                "dataSourceUrl": {
                                                    "type": "string"
                                                },
                                                "deleteUrl": {
                                                    "type": "string"
                                                },
                                                "idAlias": {
                                                    "type": "string"
                                                },
                                                "columns": {
                                                    "type": "array",
                                                    "items": [
                                                        {
                                                            "type": "object",
                                                            "properties": {
                                                                "columnName": {
                                                                    "type": "string"
                                                                },
                                                                "alias": {
                                                                    "type": "string"
                                                                },
                                                                "dataType": {
                                                                    "type": "string"
                                                                }
                                                            },
                                                            "required": [
                                                                "columnName",
                                                                "alias",
                                                                "dataType"
                                                            ]
                                                        },
                                                        {
                                                            "type": "object",
                                                            "properties": {
                                                                "columnName": {
                                                                    "type": "string"
                                                                },
                                                                "alias": {
                                                                    "type": "string"
                                                                },
                                                                "dataType": {
                                                                    "type": "string"
                                                                }
                                                            },
                                                            "required": [
                                                                "columnName",
                                                                "alias",
                                                                "dataType"
                                                            ]
                                                        }
                                                    ]
                                                }
                                            },
                                            "required": [
                                                "listName",
                                                "dataSourceUrl",
                                                "deleteUrl",
                                                "idAlias",
                                                "columns"
                                            ]
                                        },
                                        "form": {
                                            "type": "object",
                                            "properties": {
                                                "formName": {
                                                    "type": "string"
                                                },
                                                "dataSourceUrl": {
                                                    "type": "string"
                                                },
                                                "createUrl": {
                                                    "type": "string"
                                                },
                                                "updateUrl": {
                                                    "type": "string"
                                                },
                                                "idAlias": {
                                                    "type": "string"
                                                },
                                                "formControls": {
                                                    "type": "array",
                                                    "items": [
                                                        {
                                                            "type": "object",
                                                            "properties": {
                                                                "fieldName": {
                                                                    "type": "string"
                                                                },
                                                                "alias": {
                                                                    "type": "string"
                                                                },
                                                                "isReadOnly": {
                                                                    "type": "boolean"
                                                                },
                                                                "dataType": {
                                                                    "type": "string"
                                                                }
                                                            },
                                                            "required": [
                                                                "fieldName",
                                                                "alias",
                                                                "isReadOnly",
                                                                "dataType"
                                                            ]
                                                        },
                                                        {
                                                            "type": "object",
                                                            "properties": {
                                                                "fieldName": {
                                                                    "type": "string"
                                                                },
                                                                "alias": {
                                                                    "type": "string"
                                                                },
                                                                "isReadOnly": {
                                                                    "type": "boolean"
                                                                },
                                                                "dataType": {
                                                                    "type": "string"
                                                                }
                                                            },
                                                            "required": [
                                                                "fieldName",
                                                                "alias",
                                                                "isReadOnly",
                                                                "dataType"
                                                            ]
                                                        }
                                                    ]
                                                }
                                            },
                                            "required": [
                                                "formName",
                                                "dataSourceUrl",
                                                "createUrl",
                                                "updateUrl",
                                                "idAlias",
                                                "formControls"
                                            ]
                                        }
                                    },
                                    "required": [
                                        "sectionName",
                                        "alias",
                                        "list",
                                        "form"
                                    ]
                                }
                            ]
                        }
                    },
                    "required": [
                        "areaName",
                        "alias",
                        "sections"
                    ]
                }
            ]
        }
    },
    "required": [
        "appName",
        "apiUrl",
        "auth",
        "areas"
    ]
};