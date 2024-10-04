"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/signin",{

/***/ "./pages/signin.js":
/*!*************************!*\
  !*** ./pages/signin.js ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_InputWithLabel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/InputWithLabel */ \"./components/InputWithLabel.js\");\n/* harmony import */ var _components_PasswordInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/PasswordInput */ \"./components/PasswordInput.js\");\n/* harmony import */ var _components_common_Spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/common/Spinner */ \"./components/common/Spinner.js\");\n/* harmony import */ var _hoc_withAuth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/hoc/withAuth */ \"./hoc/withAuth.js\");\n/* harmony import */ var _services_Path_Path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/services/Path/Path */ \"./services/Path/Path.js\");\n/* harmony import */ var _services_auth_services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/services/auth-services */ \"./services/auth-services.js\");\n/* harmony import */ var _utils_Routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/utils/Routes */ \"./utils/Routes.js\");\n/* harmony import */ var _utils_svgGrabber__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/utils/svgGrabber */ \"./utils/svgGrabber.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/dist/react-toastify.esm.mjs\");\n/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! jwt-decode */ \"./node_modules/jwt-decode/build/esm/index.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\n\n\nconst SignIn = ()=>{\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_9__.useRouter)();\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_10__.useState)(false);\n    const [email, setEmail] = (0,react__WEBPACK_IMPORTED_MODULE_10__.useState)(\"\");\n    const [password, setPassword] = (0,react__WEBPACK_IMPORTED_MODULE_10__.useState)(\"\");\n    const divStyle = {\n        boxShadow: \"rgba(0, 0, 0, 0.24) 0px 3px 8px\"\n    };\n    const sendData = async (e)=>{\n        e.preventDefault();\n        let body = {\n            email: email,\n            password: password,\n            device: {\n                id: \"8d8c1fc3197f3054\",\n                deviceToken: \"fWp_51ntQUirNOKJWT4iS-:APA91bHV4lkMs8HIZc3F0pBe41L0C_26E1xLtJfC2PiRN3N7hVZMllYrao5WZPbscAKdjhMlbxf7zNcagMHouoR0JwbmGmh8IQPSp3T6TNHO8MQ9sZ1GDy2C_VNUrF2eoU0dIkRWA1VS\"\n            }\n        };\n        if (email === \"\") {\n            react_toastify__WEBPACK_IMPORTED_MODULE_11__.toast.warn(\"Please enter your email.\");\n        } else if (password === \"\") {\n            react_toastify__WEBPACK_IMPORTED_MODULE_11__.toast.warn(\"Please enter your password.\");\n        } else {\n            setLoading(true);\n            try {\n                var _res_data;\n                const res = await (0,_services_Path_Path__WEBPACK_IMPORTED_MODULE_5__.userLogin)(body);\n                // Check if token exists in the response\n                const token = res === null || res === void 0 ? void 0 : (_res_data = res.data) === null || _res_data === void 0 ? void 0 : _res_data.token;\n                if ((res === null || res === void 0 ? void 0 : res.success) && token) {\n                    let payload;\n                    try {\n                        payload = (0,jwt_decode__WEBPACK_IMPORTED_MODULE_12__.jwtDecode)(token);\n                    } catch (decodeError) {\n                        console.error(\"Error decoding token:\", decodeError);\n                        setLoading(false);\n                        return;\n                    }\n                    // Ensure payload is defined before setting token\n                    if (payload) {\n                        payload.token = token;\n                        localStorage.setItem(\"auth_user\", JSON.stringify(payload));\n                        react_toastify__WEBPACK_IMPORTED_MODULE_11__.toast.success(\"Login Successfully\");\n                        router.push(_utils_Routes__WEBPACK_IMPORTED_MODULE_7__.ROUTES.DASHBOARD);\n                    } else {\n                        react_toastify__WEBPACK_IMPORTED_MODULE_11__.toast.error(\"Invalid token payload.\");\n                    }\n                } else {\n                    react_toastify__WEBPACK_IMPORTED_MODULE_11__.toast.warn((res === null || res === void 0 ? void 0 : res.message) || \"Login failed.\");\n                }\n                setLoading(false);\n            } catch (error) {\n                var _error_response_data, _error_response;\n                console.error(\"Login error:\", error);\n                react_toastify__WEBPACK_IMPORTED_MODULE_11__.toast.error((error === null || error === void 0 ? void 0 : (_error_response = error.response) === null || _error_response === void 0 ? void 0 : (_error_response_data = _error_response.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || \"An error occurred.\", {\n                    autoClose: 2000\n                });\n                setLoading(false);\n            }\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n        onSubmit: sendData,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n            className: \"bg-[#b49359] flex justify-center items-center  bg-center bg-contain md:bg-no-repeat h-screen\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"w-[80%] md:w-[400px] rounded-xl mx-auto\",\n                style: {\n                    background: \"black\"\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex pl-[10%] flex-col justify-center items-center pt-10\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_utils_svgGrabber__WEBPACK_IMPORTED_MODULE_8__.Logo, {\n                            width: 120,\n                            height: 150\n                        }, void 0, false, {\n                            fileName: \"D:\\\\Bridge Zone\\\\dental-reward-admin-pannel\\\\pages\\\\signin.js\",\n                            lineNumber: 83,\n                            columnNumber: 13\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Bridge Zone\\\\dental-reward-admin-pannel\\\\pages\\\\signin.js\",\n                        lineNumber: 82,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex justify-center flex-col items-center my-5\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"text-4xl font-normal text-[#b49359]\",\n                                children: \"Welcome!\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Bridge Zone\\\\dental-reward-admin-pannel\\\\pages\\\\signin.js\",\n                                lineNumber: 86,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"text-2xl text-secondary font-thin  text-white\",\n                                children: \"Sign in to continue.\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Bridge Zone\\\\dental-reward-admin-pannel\\\\pages\\\\signin.js\",\n                                lineNumber: 87,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\Bridge Zone\\\\dental-reward-admin-pannel\\\\pages\\\\signin.js\",\n                        lineNumber: 85,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"px-5\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_InputWithLabel__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                                id: \"email\",\n                                name: \"email\",\n                                onChange: (e)=>setEmail(e.target.value),\n                                value: email,\n                                label: \"Email or Username\",\n                                placeholder: \"e.g. abc@gmail.com\",\n                                svgShow: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_utils_svgGrabber__WEBPACK_IMPORTED_MODULE_8__.Mail_SVG, {}, void 0, false, {\n                                    fileName: \"D:\\\\Bridge Zone\\\\dental-reward-admin-pannel\\\\pages\\\\signin.js\",\n                                    lineNumber: 99,\n                                    columnNumber: 24\n                                }, void 0)\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Bridge Zone\\\\dental-reward-admin-pannel\\\\pages\\\\signin.js\",\n                                lineNumber: 92,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_PasswordInput__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                onChange: (e)=>setPassword(e.target.value),\n                                value: password\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Bridge Zone\\\\dental-reward-admin-pannel\\\\pages\\\\signin.js\",\n                                lineNumber: 101,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                type: \"submit\",\n                                className: \"bg-[#b49359] text-white mt-5 mb-7 mx-auto justify-center gap-2 items-center flex font-medium py-2.5  rounded-md text-sm opacity-80 w-full\",\n                                children: [\n                                    \"Sign In \",\n                                    loading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_common_Spinner__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                                        fileName: \"D:\\\\Bridge Zone\\\\dental-reward-admin-pannel\\\\pages\\\\signin.js\",\n                                        lineNumber: 109,\n                                        columnNumber: 35\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"D:\\\\Bridge Zone\\\\dental-reward-admin-pannel\\\\pages\\\\signin.js\",\n                                lineNumber: 105,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\Bridge Zone\\\\dental-reward-admin-pannel\\\\pages\\\\signin.js\",\n                        lineNumber: 91,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\Bridge Zone\\\\dental-reward-admin-pannel\\\\pages\\\\signin.js\",\n                lineNumber: 80,\n                columnNumber: 7\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"D:\\\\Bridge Zone\\\\dental-reward-admin-pannel\\\\pages\\\\signin.js\",\n            lineNumber: 79,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"D:\\\\Bridge Zone\\\\dental-reward-admin-pannel\\\\pages\\\\signin.js\",\n        lineNumber: 78,\n        columnNumber: 5\n    }, undefined);\n};\n_s(SignIn, \"iUJm7oCx4lF60cZYnyVSx8qvh0c=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_9__.useRouter\n    ];\n});\n_c = SignIn;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_c1 = (0,_hoc_withAuth__WEBPACK_IMPORTED_MODULE_4__.withAuth)(SignIn));\nvar _c, _c1;\n$RefreshReg$(_c, \"SignIn\");\n$RefreshReg$(_c1, \"%default%\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVOLFdBQVU7MENBQWdEOzs7Ozs7Ozs7Ozs7a0NBSS9ELDhEQUFDQzt3QkFBSUQsV0FBVTs7MENBQ2IsOERBQUNwRCxrRUFBY0E7Z0NBQ2I2QixJQUFJO2dDQUNKOEIsTUFBTTtnQ0FDTkMsVUFBVSxDQUFDbkMsSUFBTU4sU0FBU00sRUFBRW9DLE1BQU0sQ0FBQ0MsS0FBSztnQ0FDeENBLE9BQU81QztnQ0FDUDZDLE9BQU87Z0NBQ1BDLGFBQWE7Z0NBQ2JDLHVCQUFTLDhEQUFDekQsdURBQVFBOzs7Ozs7Ozs7OzBDQUVwQiw4REFBQ1AsaUVBQWFBO2dDQUNaMkQsVUFBVSxDQUFDbkMsSUFBTUosWUFBWUksRUFBRW9DLE1BQU0sQ0FBQ0MsS0FBSztnQ0FDM0NBLE9BQU8xQzs7Ozs7OzBDQUVULDhEQUFDOEM7Z0NBQ0NDLE1BQUs7Z0NBQ0xmLFdBQVU7O29DQUNYO29DQUNVcEMseUJBQVcsOERBQUNkLGtFQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTzFDO0dBdEdNWTs7UUFDV0wsa0RBQVNBOzs7S0FEcEJLO0FBd0dOLCtEQUFlLE1BQUFYLHVEQUFRQSxDQUFDVyxPQUFPQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL3NpZ25pbi5qcz83OGZlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbnB1dFdpdGhMYWJlbCBmcm9tIFwiQC9jb21wb25lbnRzL0lucHV0V2l0aExhYmVsXCI7XG5pbXBvcnQgUGFzc3dvcmRJbnB1dCBmcm9tIFwiQC9jb21wb25lbnRzL1Bhc3N3b3JkSW5wdXRcIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCJAL2NvbXBvbmVudHMvY29tbW9uL1NwaW5uZXJcIjtcbmltcG9ydCB7IHdpdGhBdXRoIH0gZnJvbSBcIkAvaG9jL3dpdGhBdXRoXCI7XG5pbXBvcnQgeyB1c2VyTG9naW4gfSBmcm9tIFwiQC9zZXJ2aWNlcy9QYXRoL1BhdGhcIjtcbmltcG9ydCB7IGxvZ2luVXNlciB9IGZyb20gXCJAL3NlcnZpY2VzL2F1dGgtc2VydmljZXNcIjtcbmltcG9ydCB7IFJPVVRFUyB9IGZyb20gXCJAL3V0aWxzL1JvdXRlc1wiO1xuaW1wb3J0IHsgTG9nbywgTWFpbF9TVkcgfSBmcm9tIFwiQC91dGlscy9zdmdHcmFiYmVyXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdG9hc3QgfSBmcm9tIFwicmVhY3QtdG9hc3RpZnlcIjtcbmltcG9ydCB7IGp3dERlY29kZSB9IGZyb20gXCJqd3QtZGVjb2RlXCI7XG5cbmNvbnN0IFNpZ25JbiA9ICgpID0+IHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2VtYWlsLCBzZXRFbWFpbF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3Bhc3N3b3JkLCBzZXRQYXNzd29yZF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgZGl2U3R5bGUgPSB7XG4gICAgYm94U2hhZG93OiBcInJnYmEoMCwgMCwgMCwgMC4yNCkgMHB4IDNweCA4cHhcIixcbiAgfTtcblxuICBjb25zdCBzZW5kRGF0YSA9IGFzeW5jIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCBib2R5ID0ge1xuICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgZGV2aWNlOiB7XG4gICAgICAgIGlkOiBcIjhkOGMxZmMzMTk3ZjMwNTRcIixcbiAgICAgICAgZGV2aWNlVG9rZW46XG4gICAgICAgICAgXCJmV3BfNTFudFFVaXJOT0tKV1Q0aVMtOkFQQTkxYkhWNGxrTXM4SElaYzNGMHBCZTQxTDBDXzI2RTF4THRKZkMyUGlSTjNON2hWWk1sbFlyYW81V1pQYnNjQUtkamhNbGJ4Zjd6TmNhZ01Ib3VvUjBKd2JtR21oOElRUFNwM1Q2VE5ITzhNUTlzWjFHRHkyQ19WTlVyRjJlb1UwZElrUldBMVZTXCIsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBpZiAoZW1haWwgPT09IFwiXCIpIHtcbiAgICAgIHRvYXN0Lndhcm4oXCJQbGVhc2UgZW50ZXIgeW91ciBlbWFpbC5cIik7XG4gICAgfSBlbHNlIGlmIChwYXNzd29yZCA9PT0gXCJcIikge1xuICAgICAgdG9hc3Qud2FybihcIlBsZWFzZSBlbnRlciB5b3VyIHBhc3N3b3JkLlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHVzZXJMb2dpbihib2R5KTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdG9rZW4gZXhpc3RzIGluIHRoZSByZXNwb25zZVxuICAgICAgICBjb25zdCB0b2tlbiA9IHJlcz8uZGF0YT8udG9rZW47XG4gICAgICAgIGlmIChyZXM/LnN1Y2Nlc3MgJiYgdG9rZW4pIHtcbiAgICAgICAgICBsZXQgcGF5bG9hZDtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcGF5bG9hZCA9IGp3dERlY29kZSh0b2tlbik7XG4gICAgICAgICAgfSBjYXRjaCAoZGVjb2RlRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWNvZGluZyB0b2tlbjpcIiwgZGVjb2RlRXJyb3IpO1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEVuc3VyZSBwYXlsb2FkIGlzIGRlZmluZWQgYmVmb3JlIHNldHRpbmcgdG9rZW5cbiAgICAgICAgICBpZiAocGF5bG9hZCkge1xuICAgICAgICAgICAgcGF5bG9hZC50b2tlbiA9IHRva2VuO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJhdXRoX3VzZXJcIiwgSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xuICAgICAgICAgICAgdG9hc3Quc3VjY2VzcyhcIkxvZ2luIFN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgICAgICAgIHJvdXRlci5wdXNoKFJPVVRFUy5EQVNIQk9BUkQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b2FzdC5lcnJvcihcIkludmFsaWQgdG9rZW4gcGF5bG9hZC5cIik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvYXN0Lndhcm4ocmVzPy5tZXNzYWdlIHx8IFwiTG9naW4gZmFpbGVkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJMb2dpbiBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICB0b2FzdC5lcnJvcihlcnJvcj8ucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UgfHwgXCJBbiBlcnJvciBvY2N1cnJlZC5cIiwge1xuICAgICAgICAgIGF1dG9DbG9zZTogMjAwMCxcbiAgICAgICAgfSk7XG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxmb3JtIG9uU3VibWl0PXtzZW5kRGF0YX0+XG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJiZy1bI2I0OTM1OV0gZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgIGJnLWNlbnRlciBiZy1jb250YWluIG1kOmJnLW5vLXJlcGVhdCBoLXNjcmVlblwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LVs4MCVdIG1kOnctWzQwMHB4XSByb3VuZGVkLXhsIG14LWF1dG9cIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcImJsYWNrXCIgfX0+XG4gICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBwbC1bMTAlXSBmbGV4LWNvbCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgcHQtMTBcIj5cbiAgICAgICAgICAgIDxMb2dvIHdpZHRoPXsxMjB9IGhlaWdodD17MTUwfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgbXktNVwiPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC00eGwgZm9udC1ub3JtYWwgdGV4dC1bI2I0OTM1OV1cIj5XZWxjb21lITwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtMnhsIHRleHQtc2Vjb25kYXJ5IGZvbnQtdGhpbiAgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICBTaWduIGluIHRvIGNvbnRpbnVlLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNVwiPlxuICAgICAgICAgICAgPElucHV0V2l0aExhYmVsXG4gICAgICAgICAgICAgIGlkPXtcImVtYWlsXCJ9XG4gICAgICAgICAgICAgIG5hbWU9e1wiZW1haWxcIn1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFbWFpbChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIHZhbHVlPXtlbWFpbH1cbiAgICAgICAgICAgICAgbGFiZWw9e1wiRW1haWwgb3IgVXNlcm5hbWVcIn1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e1wiZS5nLiBhYmNAZ21haWwuY29tXCJ9XG4gICAgICAgICAgICAgIHN2Z1Nob3c9ezxNYWlsX1NWRyAvPn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8UGFzc3dvcmRJbnB1dFxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgdmFsdWU9e3Bhc3N3b3JkfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLVsjYjQ5MzU5XSB0ZXh0LXdoaXRlIG10LTUgbWItNyBteC1hdXRvIGp1c3RpZnktY2VudGVyIGdhcC0yIGl0ZW1zLWNlbnRlciBmbGV4IGZvbnQtbWVkaXVtIHB5LTIuNSAgcm91bmRlZC1tZCB0ZXh0LXNtIG9wYWNpdHktODAgdy1mdWxsXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgU2lnbiBJbiB7bG9hZGluZyAmJiA8U3Bpbm5lciAvPn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICA8L2Zvcm0+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoQXV0aChTaWduSW4pO1xuIl0sIm5hbWVzIjpbIklucHV0V2l0aExhYmVsIiwiUGFzc3dvcmRJbnB1dCIsIlNwaW5uZXIiLCJ3aXRoQXV0aCIsInVzZXJMb2dpbiIsImxvZ2luVXNlciIsIlJPVVRFUyIsIkxvZ28iLCJNYWlsX1NWRyIsInVzZVJvdXRlciIsIlJlYWN0IiwidXNlU3RhdGUiLCJ0b2FzdCIsImp3dERlY29kZSIsIlNpZ25JbiIsInJvdXRlciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZW1haWwiLCJzZXRFbWFpbCIsInBhc3N3b3JkIiwic2V0UGFzc3dvcmQiLCJkaXZTdHlsZSIsImJveFNoYWRvdyIsInNlbmREYXRhIiwiZSIsInByZXZlbnREZWZhdWx0IiwiYm9keSIsImRldmljZSIsImlkIiwiZGV2aWNlVG9rZW4iLCJ3YXJuIiwicmVzIiwidG9rZW4iLCJkYXRhIiwic3VjY2VzcyIsInBheWxvYWQiLCJkZWNvZGVFcnJvciIsImNvbnNvbGUiLCJlcnJvciIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwicHVzaCIsIkRBU0hCT0FSRCIsIm1lc3NhZ2UiLCJyZXNwb25zZSIsImF1dG9DbG9zZSIsImZvcm0iLCJvblN1Ym1pdCIsInNlY3Rpb24iLCJjbGFzc05hbWUiLCJkaXYiLCJzdHlsZSIsImJhY2tncm91bmQiLCJ3aWR0aCIsImhlaWdodCIsInAiLCJuYW1lIiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJ2YWx1ZSIsImxhYmVsIiwicGxhY2Vob2xkZXIiLCJzdmdTaG93IiwiYnV0dG9uIiwidHlwZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/signin.js\n"));

/***/ })

});