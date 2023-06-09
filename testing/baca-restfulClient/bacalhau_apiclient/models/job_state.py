# coding: utf-8

"""
    Bacalhau API

    This page is the reference of the Bacalhau REST API. Project docs are available at https://docs.bacalhau.org/. Find more information about Bacalhau at https://github.com/bacalhau-project/bacalhau.  # noqa: E501

    OpenAPI spec version: ${PYPI_VERSION}
    Contact: team@bacalhau.org
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""

import pprint
import re  # noqa: F401

import six


class JobState(object):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    """
    Attributes:
      swagger_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    swagger_types = {
        "create_time": "str",
        "executions": "list[ExecutionState]",
        "job_id": "str",
        "state": "AllOfJobStateState",
        "timeout_at": "str",
        "update_time": "str",
        "version": "int",
    }

    attribute_map = {
        "create_time": "CreateTime",
        "executions": "Executions",
        "job_id": "JobID",
        "state": "State",
        "timeout_at": "TimeoutAt",
        "update_time": "UpdateTime",
        "version": "Version",
    }

    def __init__(
        self,
        create_time=None,
        executions=None,
        job_id=None,
        state=None,
        timeout_at=None,
        update_time=None,
        version=None,
    ):  # noqa: E501
        """JobState - a model defined in Swagger"""  # noqa: E501
        self._create_time = None
        self._executions = None
        self._job_id = None
        self._state = None
        self._timeout_at = None
        self._update_time = None
        self._version = None
        self.discriminator = None
        if create_time is not None:
            self.create_time = create_time
        if executions is not None:
            self.executions = executions
        if job_id is not None:
            self.job_id = job_id
        if state is not None:
            self.state = state
        if timeout_at is not None:
            self.timeout_at = timeout_at
        if update_time is not None:
            self.update_time = update_time
        if version is not None:
            self.version = version

    @property
    def create_time(self):
        """Gets the create_time of this JobState.  # noqa: E501

        CreateTime is the time when the job was created.  # noqa: E501

        :return: The create_time of this JobState.  # noqa: E501
        :rtype: str
        """
        return self._create_time

    @create_time.setter
    def create_time(self, create_time):
        """Sets the create_time of this JobState.

        CreateTime is the time when the job was created.  # noqa: E501

        :param create_time: The create_time of this JobState.  # noqa: E501
        :type: str
        """

        self._create_time = create_time

    @property
    def executions(self):
        """Gets the executions of this JobState.  # noqa: E501

        Executions is a list of executions of the job across the nodes. A new execution is created when a node is selected to execute the job, and a node can have multiple executions for the same job due to retries, but there can only be a single active execution per node at any given time.  # noqa: E501

        :return: The executions of this JobState.  # noqa: E501
        :rtype: list[ExecutionState]
        """
        return self._executions

    @executions.setter
    def executions(self, executions):
        """Sets the executions of this JobState.

        Executions is a list of executions of the job across the nodes. A new execution is created when a node is selected to execute the job, and a node can have multiple executions for the same job due to retries, but there can only be a single active execution per node at any given time.  # noqa: E501

        :param executions: The executions of this JobState.  # noqa: E501
        :type: list[ExecutionState]
        """

        self._executions = executions

    @property
    def job_id(self):
        """Gets the job_id of this JobState.  # noqa: E501

        JobID is the unique identifier for the job  # noqa: E501

        :return: The job_id of this JobState.  # noqa: E501
        :rtype: str
        """
        return self._job_id

    @job_id.setter
    def job_id(self, job_id):
        """Sets the job_id of this JobState.

        JobID is the unique identifier for the job  # noqa: E501

        :param job_id: The job_id of this JobState.  # noqa: E501
        :type: str
        """

        self._job_id = job_id

    @property
    def state(self):
        """Gets the state of this JobState.  # noqa: E501

        State is the current state of the job  # noqa: E501

        :return: The state of this JobState.  # noqa: E501
        :rtype: AllOfJobStateState
        """
        return self._state

    @state.setter
    def state(self, state):
        """Sets the state of this JobState.

        State is the current state of the job  # noqa: E501

        :param state: The state of this JobState.  # noqa: E501
        :type: AllOfJobStateState
        """

        self._state = state

    @property
    def timeout_at(self):
        """Gets the timeout_at of this JobState.  # noqa: E501

        TimeoutAt is the time when the job will be timed out if it is not completed.  # noqa: E501

        :return: The timeout_at of this JobState.  # noqa: E501
        :rtype: str
        """
        return self._timeout_at

    @timeout_at.setter
    def timeout_at(self, timeout_at):
        """Sets the timeout_at of this JobState.

        TimeoutAt is the time when the job will be timed out if it is not completed.  # noqa: E501

        :param timeout_at: The timeout_at of this JobState.  # noqa: E501
        :type: str
        """

        self._timeout_at = timeout_at

    @property
    def update_time(self):
        """Gets the update_time of this JobState.  # noqa: E501

        UpdateTime is the time when the job state was last updated.  # noqa: E501

        :return: The update_time of this JobState.  # noqa: E501
        :rtype: str
        """
        return self._update_time

    @update_time.setter
    def update_time(self, update_time):
        """Sets the update_time of this JobState.

        UpdateTime is the time when the job state was last updated.  # noqa: E501

        :param update_time: The update_time of this JobState.  # noqa: E501
        :type: str
        """

        self._update_time = update_time

    @property
    def version(self):
        """Gets the version of this JobState.  # noqa: E501

        Version is the version of the job state. It is incremented every time the job state is updated.  # noqa: E501

        :return: The version of this JobState.  # noqa: E501
        :rtype: int
        """
        return self._version

    @version.setter
    def version(self, version):
        """Sets the version of this JobState.

        Version is the version of the job state. It is incremented every time the job state is updated.  # noqa: E501

        :param version: The version of this JobState.  # noqa: E501
        :type: int
        """

        self._version = version

    def to_dict(self):
        """Returns the model properties as a dict"""
        result = {}

        for attr, _ in six.iteritems(self.swagger_types):
            value = getattr(self, attr)
            if isinstance(value, list):
                result[attr] = list(
                    map(lambda x: x.to_dict() if hasattr(x, "to_dict") else x, value)
                )
            elif hasattr(value, "to_dict"):
                result[attr] = value.to_dict()
            elif isinstance(value, dict):
                result[attr] = dict(
                    map(
                        lambda item: (item[0], item[1].to_dict())
                        if hasattr(item[1], "to_dict")
                        else item,
                        value.items(),
                    )
                )
            else:
                result[attr] = value
        if issubclass(JobState, dict):
            for key, value in self.items():
                result[key] = value

        return result

    def to_str(self):
        """Returns the string representation of the model"""
        return pprint.pformat(self.to_dict())

    def __repr__(self):
        """For `print` and `pprint`"""
        return self.to_str()

    def __eq__(self, other):
        """Returns true if both objects are equal"""
        if not isinstance(other, JobState):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        return not self == other
